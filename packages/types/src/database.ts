import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTable {
  id: Generated<bigint>;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
  biography?: string;
  avatar?: string;
  passenger_kilometer_traveled: number;
  driver_kilometer_traveled: number;
  economy_achieved: number;
  created_at?: Date;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface TripTable {
  id: Generated<bigint>;
  driver_id: number;
  created_at: Date;
  date: Date;
  kilometer: number;
  travel_time: number;
  seat_available: number;
  price: number;
  should_auto_validate: boolean;
  comment?: string;
  is_baby_allowed: boolean;
  is_non_vaccinated_allowed: boolean;
  is_animal_allowed: boolean;
  is_smoker_allowed: boolean;
  has_tolls: boolean;
  car_id: number;
}
export type Trip = Selectable<TripTable>;
export type NewTrip = Insertable<TripTable>;
export type TripUpdate = Updateable<TripTable>;

export interface CarTable {
  id: Generated<bigint>;
  brand: string;
  model: string;
  photo: string;
  number_seat: number;
  color: string;
  plate_number: string;
  user_id: number;
}
export type Car = Selectable<CarTable>;
export type NewCar = Insertable<CarTable>;
export type CarUpdate = Updateable<CarTable>;

export interface ReservationTable {
  id: Generated<bigint>;
  user_id: number;
  number_seat: number;
  validated_at: Date;
  created_at: Date;
}
export type Reservation = Selectable<ReservationTable>;
export type NewReservation = Insertable<ReservationTable>;
export type ReservationUpdate = Updateable<ReservationTable>;

export interface ReservationSeatTable {
  id: Generated<bigint>;
  reservation_id: number;
  reserved_seat: number;
  checkpoint_trip_id: number;
}
export type ReservationSeat = Selectable<ReservationSeatTable>;
export type NewReservationSeat = Insertable<ReservationSeatTable>;
export type ReservationSeatUpdate = Updateable<ReservationSeatTable>;

type Point = {
  x: number;
  y: number;
};
export interface CheckpointTripTable {
  id: Generated<bigint>;
  start_point: Point;
  end_point: Point;
  start_address: string;
  end_address: string;
  trip_id: number;
}
export type CheckpointTrip = Selectable<CheckpointTripTable>;
export type NewCheckpointTrip = Insertable<CheckpointTripTable>;
export type CheckpointTripUpdate = Updateable<CheckpointTripTable>;

export interface NoticeTable {
  id: Generated<bigint>;
  note: number;
  sender_id: number;
  receiver_id: number;
  comment: string;
  sent_at: Date;
  trip_id: number;
}
export type Notice = Selectable<NoticeTable>;
export type NewNotice = Insertable<NoticeTable>;
export type NoticeUpdate = Updateable<NoticeTable>;

export interface MessagingTable {
  id: Generated<bigint>;
  comment: string;
  date: Date;
  sender_id: number;
  receiver_id: number;
  message_read_at: Date;
}
export type Messaging = Selectable<MessagingTable>;
export type NewNMessaging = Insertable<MessagingTable>;
export type MessagingUpdate = Updateable<MessagingTable>;

export interface Database {
  user: UserTable;
  trip: TripTable;
  car: CarTable;

  reservation: ReservationTable;
  reservation_seat: ReservationSeatTable;
  checkpoint_trip: CheckpointTripTable;
  notice: NoticeTable;
  messaging: MessagingTable;
}
