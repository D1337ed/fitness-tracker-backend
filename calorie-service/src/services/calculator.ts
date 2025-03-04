export function calculateCalories(weight: number, height: number, age: number, gender: string): number {
    if (gender === 'male') {
        return 66.47 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
        return 655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
}