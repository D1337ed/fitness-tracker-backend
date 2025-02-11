import {Router} from "express";
//TODO: implementation
import {calculateCalories} from '../controllers/calorieController';
//TODO: implementation of validation with zod library
import {calorieRequestSchema} from '../utils/validation';

const router = Router();

router.post('/', (req, res) => {})

export default router;