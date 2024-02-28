export type DataSearchTripDetails = {
  id: bigint;
  trip_id: bigint;
  start_address: string;
  end_address: string;
  kilometer: number;
  travel_time: number;
  trip: {
    id: bigint;
    date: Date;
    price: number;
    car_id: bigint;
    comment: string | null;
    driver_id: bigint;
    has_tolls: boolean;
    kilometer: number;
    travel_time: number;
    seat_available: number;
    is_baby_allowed: boolean;
    is_animal_allowed: boolean;
    is_smoker_allowed: boolean;
    should_auto_validate: boolean;
    is_non_vaccinated_allowed: boolean;
    car: {
      id: bigint;
      brand: string;
      color: string;
      model: string;
      photo: string | null;
      number_seat: number;
      plate_number: string;
    };
    driver: {
      id: bigint;
      avatar: string | null;
      lastname: string;
      firstname: string;
    };
    checkpoints: {
      id: bigint;
      trip_id: bigint;
      kilometer: number;
      travel_time: number;
      end_address: string;
      start_address: string;
    }[];
  };
  reservations: {
    id: bigint;
    reserved_seat: number;
    reservation_id: bigint | null;
    checkpoint_trip_id: bigint;
  }[];
};
