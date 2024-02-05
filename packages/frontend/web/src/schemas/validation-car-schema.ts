import { z } from 'zod';

export const validationCarSchema = z.object({
  brand: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(15, { message: 'Should contain less than 15 characters' })
    .trim(),

  model: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(25, { message: 'Should contain less than 25 characters' })
    .trim(),
  photo: z.preprocess(
    String,
    z
      .string()
      .min(1, { message: 'This field is required' })
      .max(255, { message: 'Should contain less than 255 characters' })
      .trim(),
  ),

  number_seat: z.preprocess(
    Number,
    z
      .number()
      .int()
      .nonnegative({ message: 'This field contain not negative numbers' })
      .min(1, { message: 'This field is required' }),
  ),
  color: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(10, { message: 'Should contain less than 10 characters' })
    .trim(),

  plate_number: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(12, { message: 'Should contain less than 12 characters' })
    .trim(),
});
