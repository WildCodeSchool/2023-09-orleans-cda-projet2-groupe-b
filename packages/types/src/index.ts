export * from './database';
export * from './auth';
export * from './user-preferences';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
