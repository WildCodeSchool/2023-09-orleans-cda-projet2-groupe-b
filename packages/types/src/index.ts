export * from './database';
export * from './auth';
export * from './search-trip-validation';
export * from './search-trip';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
