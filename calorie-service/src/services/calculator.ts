export function calculateCalories(weight: number, height: number, age: number, gender: string): number {
    if (gender === 'male') {
        return 66.47 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
        return 655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
}

/*
// Hier wird die Nachricht von RabbitMq empfangen und direkt berechnet.
// Wir loggen einfach alles momentan, aber man könnte auch an authservice zurückschicken...
(async () => {
    const { channel } = await connectRabbitMQ();
    const QUEUE_NAME = "calculation_queue";

    await channel.assertQueue(QUEUE_NAME);
    console.log("📥 Wartet auf Nachrichten...");

    channel.consume(QUEUE_NAME, (msg) => {
        if (msg !== null) {
            const { weight, height, age, gender } = JSON.parse(msg.content.toString());

            console.log("📩 Empfangene Daten:", { weight, height, age, gender });

            const result = calculateCalories(weight, height, age, gender);
            console.log(`🔥 Berechnete Kalorien: ${result} kcal`);

            channel.ack(msg);
        }
    });
})();
*/