import express from 'express';

const router = express.Router();

export async function findUserForCalculation(id: number): Promise<{weight: number, sport: string, duration: number}> {

    return { weight: 70, sport:"Jogging", duration: 30};
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

export default router;
