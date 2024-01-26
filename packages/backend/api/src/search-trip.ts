// import type { Request, Response } from 'express';
import express from 'express';

import { db } from '@app/backend-shared';

type Search = {
  startAddress: string;
  endAddress: string;
  passenger: number;
};

type SearchFilter = {
  id: bigint;
  start_address: string;
  end_address: string;
  passengerCheckpointTrip: {
    id: bigint;
    reserved_seat: number;
    checkpoint_trip_id: number;
  }[];
}[];

const searchTripRouter = express.Router();

searchTripRouter.get('/trips', async (req, res) => {
  const trips = await db.selectFrom('trip').selectAll().execute();
  return res.json(trips);
});

searchTripRouter.post('/search-trip', async (req, res) => {
  const searchFilter: SearchFilter = [];
  const { startAddress, endAddress, passenger } = req.body as Search;
  try {
    const checkpointsTrip = await db
      .selectFrom('checkpoint_trip')
      .select(['start_address', 'end_address', 'id'])
      .where('checkpoint_trip.start_address', 'like', '%' + startAddress + '%')
      .where('checkpoint_trip.end_address', 'like', '%' + endAddress + '%')
      // where filter by date
      .execute();

    for await (const checkpointTrip of checkpointsTrip) {
      const id = Number(checkpointTrip.id);

      const passengerCheckpointTrip = await db
        .selectFrom('reservation_seat')
        .select(['reserved_seat', 'checkpoint_trip_id', 'id'])
        .where('checkpoint_trip_id', '=', id)
        .execute();
      if (passengerCheckpointTrip.length >= passenger) {
        searchFilter.push({ ...checkpointTrip, passengerCheckpointTrip });
      }
    }
    console.log(searchFilter);

    return res.json(searchFilter);
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      error,
    });
  }
});

export { searchTripRouter };
