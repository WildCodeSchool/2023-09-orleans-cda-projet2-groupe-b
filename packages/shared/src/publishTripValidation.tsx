import { z } from 'zod';

export const SearchPublishTripSchema = z.object({
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
  checkpoint: z.array(
    z.object({
      name: z.string(),
      address: z
        .string()
        .trim()
        .min(3, {
          message: 'ⓘ Address too short',
        })
        .max(255, {
          message: 'ⓘ Address too long',
        }),
    }),
  ),
  date: z.date({
    required_error: 'ⓘ Please select a date and time',
    invalid_type_error: "ⓘ That's not a date!",
  }),
});
export type SearchPublishTripType = z.infer<typeof SearchPublishTripSchema>;

export const InfoPublishTripSchema = z.object({
  price: z
    .number()
    .positive()
    .min(1, {
      message: 'ⓘ The price cannot be less than 1 euro',
    })
    .max(100, { message: 'ⓘ The price cannot exceed 100 euro' }),
  car: z.string().min(3, { message: 'ⓘ Please select or add a vehicle' }),
  reservation_seat: z.number().array().nonempty({
    message: 'ⓘ Please select a valid passenger seat',
  }),
  driver_id: z.bigint(),
  seat_available: z.number().min(1, {
    message: 'ⓘ Please select a valid passenger seat',
  }),
  should_auto_validate: z.boolean(),
  is_baby_allowed: z.boolean(),
  is_non_vaccinated_allowed: z.boolean(),
  is_animal_allowed: z.boolean(),
  is_smoker_allowed: z.boolean(),
  comment: z
    .string()
    .max(1000, {
      message: 'ⓘ Your comment must be less than 1000 characters long',
    })
    .optional(),
});

export type InfoPublishTripType = z.infer<typeof InfoPublishTripSchema>;

export const ItineraryPublishTripSchema = z.object({
  kilometer: z.number(),
  travel_time: z.number(),
  has_tolls: z.boolean(),
  itinerary: z.array(
    z.object({
      start_address: z.string(),
      end_address: z.string(),
      distance: z.number(),
      duration: z.number(),
      start_point: z.object({
        x: z.number(),
        y: z.number(),
      }),
      end_point: z.object({
        x: z.number(),
        y: z.number(),
      }),
    }),
  ),
});

export type ItineraryPublishTripType = z.infer<
  typeof ItineraryPublishTripSchema
>;
// const PublishTripSchema = z.object({
//   driver_id: z.bigint(),
//   created_at: z.date(),
//   date: z.date({ required_error: 'Please select a date and time' }),
//   kilometer: z.number(),
//   travel_time: z.number(),
//   seat_available: z.number().min(1),
//   price: z.number(),

//   has_tolls: z.boolean(),
//   car_id: z.bigint(),
// });
// const CheckpointSchema = z
//   .array(
//     z.object({
//       start_point: z.object({
//         x: z.number(),
//         y: z.number(),
//       }),
//       end_point: z.object({
//         x: z.number(),
//         y: z.number(),
//       }),
//       start_address: z.string(),
//       end_address: z.string(),
//       trip_id: z.bigint(),
//     }),
//   )
//   .nonempty()
//   .min(1)
//   .max(10);
// export const PublishTripWithCheckpointSchema = PublishTripSchema.extend({
//   CheckpointSchema,
// });
// type CheckpointType = z.infer<typeof CheckpointSchema>;
// type PublishTripType = z.infer<typeof PublishTripSchema>;
// type PublishTripWithCheckpointType = z.infer<
//   typeof PublishTripWithCheckpointSchema
// >;
