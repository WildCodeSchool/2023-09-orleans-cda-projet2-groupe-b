export type DataSearchTrip = {
  cp_t_id: bigint;
  start_address: string;
  end_address: string;
  cp_t_kilometer: number;
  cp_t_travel_time: number;
  t_id: bigint;
  driver_id: bigint;
  date: Date;
  price: number;
  seat_available: number;
  firstname: string;
  lastname: string;
  avatar?: string;
  start_distance: number;
  end_distance: number;
  passengerSearchTrip: {
    id: bigint;
    reserved_seat: number;
    checkpoint_trip_id: bigint;
    reservation_id: bigint | undefined;
  }[];
};
