import amqp from 'amqplib';
import { db } from '../database/connection';

export async function listenForUserUpdates() {
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
