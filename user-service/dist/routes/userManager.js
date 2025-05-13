"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserDataToCalorieService = sendUserDataToCalorieService;
exports.connectRabbitMQ = connectRabbitMQ;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/*export async function findUserForCalculation(id: number): Promise<{weight: number, sport: string, duration: number}> {

    return { weight: 70, sport:"Jogging", duration: 30};
}
    */
function sendUserDataToCalorieService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqplib_1.default.connect('amqp://localhost');
            const channel = yield connection.createChannel();
            const queueName = 'calculation_queue';
            const message = {
                weight: 70,
                height: 175,
                age: 25,
                gender: 'm'
            };
            yield channel.assertQueue(queueName, { durable: true }); // Stellt sicher, dass die Queue existiert
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
                persistent: true, // Sorgt dafür, dass die Nachricht nicht verloren geht
            });
            console.log(`📤 Nachricht an Queue '${queueName}' gesendet:`, message);
        }
        catch (error) {
            console.error("❌ Fehler beim Senden der Nachricht:", error);
        }
    });
}
const amqplib_1 = __importDefault(require("amqplib"));
const RABBITMQ_URL = "amqp://localhost"; // Standard-RabbitMQ-URL
function connectRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Verbindung zu RabbitMQ aufbauen
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            const channel = yield connection.createChannel();
            console.log("✅ Erfolgreich mit RabbitMQ verbunden");
            return { connection, channel };
        }
        catch (error) {
            console.error("❌ Fehler bei der Verbindung zu RabbitMQ:", error);
            process.exit(1); // Beendet das Programm, falls keine Verbindung möglich ist
        }
    });
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
exports.default = router;
