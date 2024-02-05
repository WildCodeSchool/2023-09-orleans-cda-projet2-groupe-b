export type RegisterBody = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: Date;
  };
  
  export type LoginBody = {
    email: string;
    password: string;
  };