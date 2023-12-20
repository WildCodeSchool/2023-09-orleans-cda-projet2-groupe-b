import { z } from 'zod';

export const isDateValid = (value: string | Date) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const validationRegisterSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(1, { message: 'Firstname is required' })
      .max(100, { message: 'Should contain less than 100 characters' }),
    lastname: z
      .string()
      .trim()
      .min(1, { message: 'Lastname is required' })
      .max(100, { message: 'Should contain less than 100 characters' }),
    birthdate: z.string().refine(isDateValid, { message: 'Invalid birthdate' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .max(254, { message: 'Email must have less than 254 character' })
      .email({ message: 'Must be a valid email' })
      .trim(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export type ValidationRegisterSchema = z.infer<typeof validationRegisterSchema>;
