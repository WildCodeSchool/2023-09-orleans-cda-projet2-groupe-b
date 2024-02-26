export * from './database';
export * from './auth';
export * from '@app/shared/src/search-trip-validation';
export * from './search-trip';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
