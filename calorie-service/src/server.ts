import express from 'express';
import bodyParser from 'body-parser';
import { db } from './database/connection';
import { listenForUserUpdates } from './services/messageQueue';
import calculateRoutes from './routes/calculate';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use('/calculate', calculateRoutes);

//listenForUserUpdates();

app.listen(PORT, () => {
    console.log(`Calorie Service Running on Port ${PORT}`);
});
