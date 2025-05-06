import express from 'express';
import dotenv from 'dotenv';
import calculateRoutes from './routes/calculate';
import { initializeDatabase } from './database/initDatabase'; // <- Use the correct init function

dotenv.config({ path: '/workspaces/fitness-tracker-backend/calorie-service/.env' });


const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());


// Initialize the database BEFORE setting up routes or starting the server
initializeDatabase()
    .then(() => {
        console.log('Database initialized successfully.');

        // Register routes after DB is ready
        app.use('/calculate', calculateRoutes);

        // Start server
        app.listen(PORT, () => {
            console.log(`Calorie Service Running on Port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });
