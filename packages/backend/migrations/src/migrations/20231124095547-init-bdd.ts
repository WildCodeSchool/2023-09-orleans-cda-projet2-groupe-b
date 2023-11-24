// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/types';

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.schema.dropTable('user').ifExists().execute();
  await db.schema.dropTable('trip').ifExists().execute();
  await db.schema.dropTable('car').ifExists().execute();
  await db.schema.dropTable('car_type').ifExists().execute();
  await db.schema.dropTable('reservation').ifExists().execute();
  await db.schema.dropTable('reservation_seat').ifExists().execute();
  await db.schema.dropTable('checkpoint_trip').ifExists().execute();
  await db.schema.dropTable('notice').ifExists().execute();
  await db.schema.dropTable('messaging').ifExists().execute();
}

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.schema
    .createTable('user')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('firstname', 'varchar(100)', (col) => col.notNull())
    .addColumn('lastname', 'varchar(100)', (col) => col.notNull())
    .addColumn('email', 'varchar(100)', (col) => col.notNull().unique())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('birthdate', 'datetime', (col) => col.notNull())
    .addColumn('biography', 'text')
    .addColumn('avatar', 'varchar(255)')
    .addColumn('passenger_kilometer_traveled', 'decimal(8, 1)', (col) =>
      col.notNull().unsigned(),
    )
    .addColumn('driver_kilometer_traveled', 'decimal(8, 1)', (col) =>
      col.notNull().unsigned(),
    )
    .addColumn('economy_achieved', 'int4', (col) => col.notNull().unsigned())
    .addColumn('created_at', 'datetime', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('trip')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('driver_id', 'int8', (col) =>
      col.references('driver.id').notNull().unsigned(),
    )
    .addColumn('created_at', 'datetime', (col) => col.notNull())
    .addColumn('date', 'datetime', (col) => col.notNull())
    .addColumn('kilometer', 'decimal(6, 1)', (col) => col.notNull().unsigned())
    .addColumn('travel_time', 'datetime', (col) => col.notNull())
    .addColumn('seat_available', 'int2', (col) => col.notNull().unsigned())
    .addColumn('price', 'int2', (col) => col.notNull().unsigned())
    .addColumn('is_auto_validation', 'boolean', (col) => col.notNull())
    .addColumn('comment', 'text')
    .addColumn('is_baby_allowed', 'boolean', (col) => col.notNull())
    .addColumn('is_non_vaccinated_allowed', 'boolean', (col) => col.notNull())
    .addColumn('is_animal_allowed', 'boolean', (col) => col.notNull())
    .addColumn('is_smoker_allowed', 'boolean', (col) => col.notNull())
    .addColumn('is_with_toll', 'boolean', (col) => col.notNull())
    .addColumn('car_id', 'int8', (col) =>
      col.references('car.id').notNull().unsigned(),
    )
    .execute();

  await db.schema
    .createTable('car')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('photo', 'varchar(255)')
    .addColumn('number_seat', 'int2', (col) => col.notNull().unsigned())
    .addColumn('color', 'varchar(10)', (col) => col.notNull())
    .addColumn('plate_number', 'varchar(12)', (col) => col.notNull())
    .addColumn('user_id', 'int8', (col) =>
      col.references('user.id').notNull().unsigned(),
    )
    .addColumn('car_type_id', 'int2', (col) =>
      col.references('car_type.id').notNull().unsigned(),
    )
    .execute();

  await db.schema
    .createTable('car_type')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('brand', 'varchar(15)', (col) => col.notNull())
    .addColumn('model', 'varchar(25)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('reservation')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('user_id', 'int8', (col) =>
      col.references('user.id').notNull().unsigned(),
    )
    .addColumn('number_seat', 'int2', (col) => col.notNull().unsigned())
    .addColumn('validated_at', 'datetime', (col) => col.notNull())
    .addColumn('created_at', 'datetime', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('reservation_seat')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('reservation_id', 'int8', (col) =>
      col.references('reservation.id').notNull().unsigned(),
    )
    .addColumn('reserved_seat', 'int2', (col) => col.notNull().unsigned())
    .addColumn('checkpoint_trip_id', 'int8', (col) =>
      col.references('checkpoint_trip.id').notNull().unsigned(),
    )
    .execute();

  await db.schema
    .createTable('checkpoint_trip')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('start_point', sql`point`, (col) => col.notNull())
    .addColumn('end_point', sql`point`, (col) => col.notNull())
    .addColumn('start_address', 'varchar(255)', (col) => col.notNull())
    .addColumn('end_address', 'varchar(255)', (col) => col.notNull())
    .addColumn('trip_id', 'int8', (col) =>
      col.references('trip.id').notNull().unsigned(),
    )
    .execute();

  await db.schema
    .createTable('notice')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('note', 'int2', (col) => col.notNull().unsigned())
    .addColumn('sender_id', 'int8', (col) =>
      col.references('user.id').notNull().unsigned(),
    )
    .addColumn('receiver_id', 'int8', (col) =>
      col.references('user.id').notNull().unsigned(),
    )
    .addColumn('comment', 'text', (col) => col.notNull())
    .addColumn('sent_at', 'datetime', (col) => col.notNull())
    .addColumn('trip_id', 'int8', (col) =>
      col.references('trip.id').notNull().unsigned(),
    )
    .execute();

  await db.schema
    .createTable('messaging')
    .addColumn('id', 'int8', (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn('comment', 'text', (col) => col.notNull())
    .addColumn('date', 'datetime', (col) => col.notNull())
    .addColumn('sender_id', 'int8', (col) =>
      col.references('user.id').notNull().unsigned(),
    )
    .addColumn('receiver_id', 'int8', (col) =>
      col.references('user.id').notNull().unsigned(),
    )
    .addColumn('message_read_at', 'datetime', (col) => col.notNull())
    .execute();
}
