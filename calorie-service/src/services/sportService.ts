import { getSportByName } from '../database/connection';

export async function calculateCaloriesForSport(sportName: string, weight: number, duration: number): Promise<number> {
    console.log('in sportscalculator:'+ sportName + weight + duration);
    const sport = await getSportByName(sportName);

    if (!sport) {
        throw new Error(`Sport with name "${sportName}" not found`);
    }

    const metsValue = sport.metsValue;

    const caloriesBurned = (metsValue * weight * duration) / 60;
    return caloriesBurned;
}