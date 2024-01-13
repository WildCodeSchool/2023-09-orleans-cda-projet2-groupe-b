import { z } from 'zod';

export const SearchPublishTripSchema = z.object({
  from: z
    .string({ required_error: 'Address required' })
    .min(3, 'Address too short'),
  checkpoint: z.array(
    z.object({
      name: z.string(),
      address: z
        .string({ required_error: 'Address required' })
        .min(3, 'Address too short'),
    }),
  ),
  to: z
    .string({ required_error: 'Address required' })
    .min(3, 'Address too short'),
  date: z.date({ required_error: 'Please select a date and time' }),
});
export type SearchPublishTripType = z.infer<typeof SearchPublishTripSchema>;

// const PublishTripSchema = z.object({
//   driver_id: z.bigint(),
//   created_at: z.date(),
//   date: z.date({ required_error: 'Please select a date and time' }),
//   kilometer: z.number(),
//   travel_time: z.number(),
//   seat_available: z.number().min(1),
//   price: z.number(),
//   comment: z.string().optional().nullable(),
//   should_auto_validate: z.boolean(),
//   is_baby_allowed: z.boolean(),
//   is_animal_allowed: z.boolean(),
//   is_smoker_allowed: z.boolean(),
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
