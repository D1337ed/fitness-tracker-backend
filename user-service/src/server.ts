import express from 'express';
import bodyParser from 'body-parser';
import { db } from './database/connection';
//import { listenForUserUpdates } from './services/messageQueue';
import userRoutes from './routes/userManager';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/userManager', userRoutes);

//listenForUserUpdates();

app.listen(PORT, () => {
    console.log(`User Service Running on Port ${PORT}`);
});
