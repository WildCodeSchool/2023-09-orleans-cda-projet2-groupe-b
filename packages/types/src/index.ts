export * from './database';
export * from './auth';
export * from './user-preferences';
export * from './search-trip';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
