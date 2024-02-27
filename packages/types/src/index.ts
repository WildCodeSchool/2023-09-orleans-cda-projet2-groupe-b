export * from './database';
export * from './auth';
export * from './search-trip';
export * from './search-trip-details';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
