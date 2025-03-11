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
