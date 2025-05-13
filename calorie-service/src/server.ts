import express from 'express';
import dotenv from 'dotenv';
import calculateRoutes from './routes/calculate';
import { initializeDatabase } from './database/initDatabase';
import { listenForUserUpdates } from './services/messageQueue';

import './services/calculator'; // Importiert die Datei und führt den RabbitMQ-Consumer aus
import { listenForCalculationRequests } from './services/calculator';
import logger from './logger'; // Logger importieren
import register from './metrics'; // Prometheus Metriken importieren

dotenv.config({ path: '/workspaces/fitness-tracker-backend/calorie-service/.env' });

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

// Initialisierung der Datenbank
initializeDatabase()
    .then(() => {
        logger.info('Database initialized successfully.');

        app.use('/calculate', calculateRoutes);

        // Prometheus Metriken
        app.get('/metrics', async (req, res) => {
            res.set('Content-Type', register.contentType);
            res.end(await register.metrics());
        });

        // Server starten
        app.listen(PORT, () => {
            logger.info(`Calorie Service Running on Port ${PORT}`);
        });
    }).then(() => {
        // Warten auf Nutzeraktualisierungen
        listenForUserUpdates();
        listenForCalculationRequests();
    })
    .catch((error) => {
        logger.error('Failed to initialize database: ' + error);
        process.exit(1);
    });
