import express from 'express';
import bodyParser from 'body-parser';
import { db } from './database/connection';
import { listenForUserUpdates } from './services/messageQueue';
import calculateRoutes from './routes/calculate';

const app = express();
app.use(bodyParser.json());

app.use('/calculate', calculateRoutes);

listenForUserUpdates();

app.listen(3000, () => console.log('Calorie Microservice running on port 3000'));
