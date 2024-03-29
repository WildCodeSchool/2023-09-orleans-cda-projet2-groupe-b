import { z } from 'zod';

export const searchTripSchema = z.object({
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
  passenger: z.preprocess(Number, z.number().gte(1).lte(8)),
  date: z.date({
    required_error: 'ⓘ Please select a date and time',
    invalid_type_error: "ⓘ That's not a date!",
  }),
});
export type SearchTripType = z.infer<typeof searchTripSchema>;

export const reservationSeatTripSchema = z.object({
  seatSelectId: z.array(z.number()).refine((data) => data.length > 0, {
    message: 'ⓘ Please select a valid passenger seat',
  }),
  shouldAutoValidate: z.boolean(),
});
export type ReservationSeatTripType = z.infer<typeof reservationSeatTripSchema>;
