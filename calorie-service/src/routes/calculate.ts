import express from 'express';
import { calculateCalories } from '../services/calculator';

const router = express.Router();

router.post('/', (req, res) => {
    const { weight, height, age, gender } = req.body;

    if (!weight || !height || !age || !gender) {
        res.status(400).send({ error: 'Missing required parameters' });
        return;
    }
    const calories = calculateCalories(weight, height, age, gender);
    res.send({ calories });
    return; 
});

export default router;
