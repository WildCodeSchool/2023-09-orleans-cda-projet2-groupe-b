export type AuthBody = {
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
  created_at: Date;
};
