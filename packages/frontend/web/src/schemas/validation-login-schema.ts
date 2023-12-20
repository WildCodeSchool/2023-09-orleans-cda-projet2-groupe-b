import { z } from 'zod';

export const validationLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(254, { message: 'Should contain less than 254 characters' })
    .email({ message: 'Must be a valid email' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .trim(),
});

export type ValidationLoginSchema = z.infer<typeof validationLoginSchema>;
