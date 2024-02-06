export * from './database';
export * from './auth';
export * from './userPreferences'

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
