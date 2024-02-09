import { z } from 'zod';

export const searchPublishTripSchema = z.object({
  from: z
    .string()
    .trim()
    .min(3, {
      message: 'ⓘ Address too short',
    })
    .max(255, {
      message: 'ⓘ Address too long',
    }),
  to: z
    .string()
    .trim()
    .min(3, {
      message: 'ⓘ Address too short',
    })
    .max(255, {
      message: 'ⓘ Address too long',
    }),
  passenger: z.number(),
  date: z.date({
    required_error: 'ⓘ Please select a date and time',
    invalid_type_error: "ⓘ That's not a date!",
  }),
});
export type SearchPublishTripType = z.infer<typeof searchPublishTripSchema>;
