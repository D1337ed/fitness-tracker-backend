import { getDb } from '../database/initDatabase';

export async function listenForUserUpdates() {
    const db = getDb();
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'user_updates';

    await channel.assertQueue(queue, { durable: true });

    console.log(`Listening for messages in ${queue}`);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const { userId, weight, height, age, gender } = JSON.parse(msg.content.toString());

            await db.query(
                'UPDATE users SET weight = ?, height = ?, age = ?, gender = ? WHERE id = ?',
                [weight, height, age, gender, userId]
            );

            console.log(`Updated user ${userId} in the database.`);
            channel.ack(msg);
        }
    });
}

import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost"; // Standard-RabbitMQ-URL

export async function connectRabbitMQ() {
    try {
        // Verbindung zu RabbitMQ aufbauen
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        console.log("✅ Erfolgreich mit RabbitMQ verbunden");
        return { connection, channel };
    } catch (error) {
        console.error("❌ Fehler bei der Verbindung zu RabbitMQ:", error);
        process.exit(1); // Beendet das Programm, falls keine Verbindung möglich ist
    }
}

export async function sendToQueue(queueName: string, message: any) {
    try {
        const { channel } = await connectRabbitMQ();

        await channel.assertQueue(queueName, { durable: true }); // Stellt sicher, dass die Queue existiert
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true, // Sorgt dafür, dass die Nachricht nicht verloren geht
        });

        console.log(`📤 Nachricht an Queue '${queueName}' gesendet:`, message);
    } catch (error) {
        console.error("❌ Fehler beim Senden der Nachricht:", error);
    }
}
