import express from 'express';
import dotenv from 'dotenv';
import calorieRoutes from './routes/calorieRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/calculate', calorieRoutes);

app.listen(PORT, () => {
    console.log(`Calorie Service Running on Port ${PORT}`);
});
