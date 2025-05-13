import express from 'express';

const router = express.Router();

/*export async function findUserForCalculation(id: number): Promise<{weight: number, sport: string, duration: number}> {

    return { weight: 70, sport:"Jogging", duration: 30};
}
    */
export async function sendUserDataToCalorieService() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queueName = 'calculation_queue';
        const message = {
            weight: 70,
            height: 175,
            age: 25,
            gender:'m'
        }

        await channel.assertQueue(queueName, { durable: true }); // Stellt sicher, dass die Queue existiert
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true, // Sorgt dafür, dass die Nachricht nicht verloren geht
        });

        console.log(`📤 Nachricht an Queue '${queueName}' gesendet:`, message);
    } catch (error) {
        console.error("❌ Fehler beim Senden der Nachricht:", error);
    }
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

router.post('/', (req, res) => {
    const { weight, sport, duration } = req.body;

    if (!weight || !sport || !duration) {
        res.status(400).send({ error: 'Missing required parameters' });
        return;
    }
    const result = {
        weight,
        sport,
        duration
    };
    res.send({ result });
    return; 
});

export default router;
