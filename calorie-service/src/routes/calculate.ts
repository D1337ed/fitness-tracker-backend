import express from 'express';
import { calculateCalories } from '../services/calculator';
import { validateCalorieInput } from '../utils/validation';
import { calculateCaloriesForSport } from '../services/sportService';

const router = express.Router();

function calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

router.post('/', (req, res) => {
    try {
        const validationResult = validateCalorieInput(req.body.user);

        if (!validationResult.success) {
            res.status(400).send({ error: 'Invalid input', details: validationResult.error });
            return;
        }

        const user = validationResult.data;

        if (!user) {
            res.status(400).send({ error: 'Invalid input', details: 'User data is undefined' });
            return;
        }

        const age = calculateAge(user.birthdate);

        const calories = calculateCalories(user.weight, user.height, age, user.gender === 'M' ? 'male' : 'female');
        res.send({ calories });
    } catch (error) {
        console.error('Error calculating calories:', error);
        res.status(500).send({ error: 'Internal server error in calculate calories' });
    }
});
router.post('/sport-calories', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { sportName, weight, duration } = req.body;

        if (!sportName || !weight || !duration) {
            res.status(400).send({ error: 'Missing required fields: sportName, weight, or duration' });
        }

        const calories = await calculateCaloriesForSport(sportName, weight, duration);

        res.send({ sportName, weight, duration, calories });
    } catch (error) {
        console.error('Error calculating sport calories:', error);
        res.status(500).send({ 
            error: 'Internal server error at calculating sport calories', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
});

export default router;
