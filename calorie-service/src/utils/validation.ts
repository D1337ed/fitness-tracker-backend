import { z } from 'zod';

export const calorieInputSchema = z.object({
  weight: z.number().positive(),
  height: z.number().positive(),
  birthdate: z.string().nonempty(),    
  gender: z.enum(['M', 'F']),
});

export const validateCalorieInput = (data: unknown) => {
  try {
    const validatedData = calorieInputSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, error };
  }
};