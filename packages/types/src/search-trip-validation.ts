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

export const PassengerCheckpointTripSchema = z.object({
  id: z.bigint(),
  reserved_seat: z.number(),
  checkpoint_trip_id: z.number(),
  reservation_id: z.null().or(z.number()),
});

export const resultSearchTripSchema = z.array(
  z.object({
    cp_t_id: z.bigint(),
    start_address: z.string(),
    end_address: z.string(),
    cp_t_kilometer: z.number(),
    cp_t_travel_time: z.number(),
    t_id: z.bigint(),
    driver_id: z.number(),
    car_id: z.number(),
    date: z.date(),
    price: z.number(),
    comment: z.string().optional(),
    seat_available: z.number(),
    should_auto_validate: z.boolean(),
    is_animal_allowed: z.boolean(),
    is_baby_allowed: z.boolean(),
    is_smoker_allowed: z.boolean(),
    is_non_vaccinated_allowed: z.boolean(),
    firstname: z.string(),
    lastname: z.string(),
    avatar: z.string().optional(),
    start_distance: z.number(),
    end_distance: z.number(),
    passengerCheckpointTrip: z.array(PassengerCheckpointTripSchema),
  }),
);

export type ResultSearchTripType = z.infer<typeof resultSearchTripSchema>;

export const reservationSeatTripSchema = z.object({
  seatSelectId: z.array(z.number()).refine((data) => data.length > 0, {
    message: 'ⓘ Please select a valid passenger seat',
  }),
  shouldAutoValidate: z.boolean(),
});
export type ReservationSeatTripType = z.infer<typeof reservationSeatTripSchema>;
