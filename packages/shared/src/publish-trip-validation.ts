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
export type SearchPublishTripType = z.infer<typeof searchPublishTripSchema>;

export const infoPublishTripSchema = z.object({
  driverId: z.bigint(),
  price: z.preprocess(
    Number,
    z
      .number()
      .positive()
      .min(1, {
        message: 'ⓘ The price cannot be less than 1 euro',
      })
      .max(99, { message: 'ⓘ The price cannot exceed 100 euro' }),
  ),
  carId: z.string().min(1, { message: 'ⓘ Please select or add a vehicle' }),
  reservationSeat: z.array(z.number()).refine((data) => data.length > 0, {
    message: 'ⓘ Please select a valid passenger seat',
  }),

  seatAvailable: z.number().min(1, {
    message: 'ⓘ Please select a valid passenger seat',
  }),
  shouldAutoValidate: z.boolean(),
  isBabyAllowed: z.boolean(),
  isNonVaccinatedAllowed: z.boolean(),
  isAnimalAllowed: z.boolean(),
  isSmokerAllowed: z.boolean(),
  comment: z
    .string()
    .trim()
    .max(1000, {
      message: 'ⓘ Your comment must be less than 1000 characters long',
    })
    .optional(),
});

export type InfoPublishTripType = z.infer<typeof infoPublishTripSchema>;

export const reservationSeatPublishTripSchema = z.object({
  reservationSeat: z.array(z.number()).refine((data) => data.length > 0, {
    message: 'ⓘ Please select a valid passenger seat',
  }),
});
export type ReservationSeatPublishTripType = z.infer<
  typeof reservationSeatPublishTripSchema
>;

export const itineraryPublishTripSchema = z.object({
  kilometer: z.number(),
  travelTime: z.number(),
  hasTolls: z.boolean(),
  itinerary: z.array(
    z.object({
      startAddress: z.string(),
      endAddress: z.string(),
      kilometer: z.number(),
      travelTime: z.number(),
      startPoint: z.object({
        x: z.number(),
        y: z.number(),
      }),
      endPoint: z.object({
        x: z.number(),
        y: z.number(),
      }),
    }),
  ),
});

export type ItineraryPublishTripType = z.infer<
  typeof itineraryPublishTripSchema
>;

export const reqBodyCheckpointSchema = z.array(
  z.object({
    startAddress: z.string(),
    endAddress: z.string(),
    kilometer: z.number(),
    travelTime: z.number(),
    startPoint: z.object({
      x: z.number(),
      y: z.number(),
    }),
    endPoint: z.object({
      x: z.number(),
      y: z.number(),
    }),
    tripId: z.bigint(),
  }),
);
export type RequestBodyCheckpointType = z.infer<typeof reqBodyCheckpointSchema>;

export const reqBodyTripSchema = infoPublishTripSchema
  .omit({
    reservationSeat: true,
  })
  .extend({
    kilometer: z.number(),
    travelTime: z.number(),
    hasTolls: z.boolean(),
    date: z.date({
      required_error: 'ⓘ Please select a date and time',
      invalid_type_error: "ⓘ That's not a date!",
    }),
    createdAt: z.date(),
  });
export type RequestBodyTripType = z.infer<typeof reqBodyTripSchema>;
