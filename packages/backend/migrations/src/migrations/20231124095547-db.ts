// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/types';

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('messaging').ifExists().execute();
    await trx.schema.dropTable('notice').ifExists().execute();
    await trx.schema.dropTable('reservation_seat').ifExists().execute();
    await trx.schema.dropTable('reservation').ifExists().execute();
    await trx.schema.dropTable('checkpoint_trip').ifExists().execute();
    await trx.schema.dropTable('trip').ifExists().execute();
    await trx.schema.dropTable('car').ifExists().execute();
    await trx.schema.dropTable('car_type').ifExists().execute();
    await trx.schema.dropTable('user').ifExists().execute();
  });
}

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .createTable('user')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('firstname', 'varchar(100)', (col) => col.notNull())
      .addColumn('lastname', 'varchar(100)', (col) => col.notNull())
      .addColumn('email', 'varchar(100)', (col) => col.notNull().unique())
      .addColumn('password', 'varchar(255)', (col) => col.notNull())
      .addColumn('birthdate', 'date', (col) => col.notNull())
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

    await trx.schema
      .createTable('car_type')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('brand', 'varchar(15)', (col) => col.notNull())
      .addColumn('model', 'varchar(25)', (col) => col.notNull())
      .execute();

    await trx.schema
      .createTable('car')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('photo', 'varchar(255)')
      .addColumn('number_seat', 'int2', (col) => col.notNull().unsigned())
      .addColumn('color', 'varchar(10)', (col) => col.notNull())
      .addColumn('plate_number', 'varchar(12)', (col) => col.notNull())
      .addColumn('user_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('car_type_id', 'int8', (col) => col.notNull().unsigned())
      .addForeignKeyConstraint('user_car_id_fk', ['user_id'], 'user', ['id'])
      .addForeignKeyConstraint('car_type_id_fk', ['car_type_id'], 'car_type', [
        'id',
      ])
      .execute();

    await trx.schema
      .createTable('trip')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('driver_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('created_at', 'datetime', (col) => col.notNull())
      .addColumn('date', 'datetime', (col) => col.notNull())
      .addColumn('kilometer', 'decimal(6, 1)', (col) =>
        col.notNull().unsigned(),
      )
      .addColumn('travel_time', 'int2', (col) => col.notNull())
      .addColumn('seat_available', 'int2', (col) => col.notNull().unsigned())
      .addColumn('price', 'int2', (col) => col.notNull().unsigned())
      .addColumn('should_auto_validate', 'boolean', (col) => col.notNull())
      .addColumn('comment', 'text')
      .addColumn('is_baby_allowed', 'boolean', (col) => col.notNull())
      .addColumn('is_non_vaccinated_allowed', 'boolean', (col) => col.notNull())
      .addColumn('is_animal_allowed', 'boolean', (col) => col.notNull())
      .addColumn('is_smoker_allowed', 'boolean', (col) => col.notNull())
      .addColumn('has_tolls', 'boolean', (col) => col.notNull())
      .addColumn('car_id', 'int8', (col) => col.notNull().unsigned())
      .addForeignKeyConstraint('trip_driver_id_fk', ['driver_id'], 'user', [
        'id',
      ])
      .addForeignKeyConstraint('driver_car_id_fk', ['car_id'], 'car', ['id'])
      .execute();

    await trx.schema
      .createTable('checkpoint_trip')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('start_point', sql`point`, (col) => col.notNull())
      .addColumn('end_point', sql`point`, (col) => col.notNull())
      .addColumn('start_address', 'varchar(255)', (col) => col.notNull())
      .addColumn('end_address', 'varchar(255)', (col) => col.notNull())
      .addColumn('trip_id', 'int8', (col) => col.notNull().unsigned())
      .addForeignKeyConstraint('trip_id_fk', ['trip_id'], 'trip', ['id'])
      .execute();

    await trx.schema
      .createTable('reservation')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('user_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('number_seat', 'int2', (col) => col.notNull().unsigned())
      .addColumn('validated_at', 'datetime', (col) => col.notNull())
      .addColumn('created_at', 'datetime', (col) => col.notNull())
      .addForeignKeyConstraint('reservation_user_id_fk', ['user_id'], 'user', [
        'id',
      ])
      .execute();

    await trx.schema
      .createTable('reservation_seat')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('reservation_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('reserved_seat', 'int2', (col) => col.notNull().unsigned())
      .addColumn('checkpoint_trip_id', 'int8', (col) =>
        col.notNull().unsigned(),
      )
      .addForeignKeyConstraint(
        'reservation_id_fk',
        ['reservation_id'],
        'reservation',
        ['id'],
      )
      .addForeignKeyConstraint(
        'checkpoint_trip_id_fk',
        ['checkpoint_trip_id'],
        'checkpoint_trip',
        ['id'],
      )
      .execute();

    await trx.schema
      .createTable('notice')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('note', 'int2', (col) => col.notNull().unsigned())
      .addColumn('sender_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('receiver_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('comment', 'text', (col) => col.notNull())
      .addColumn('sent_at', 'datetime', (col) => col.notNull())
      .addColumn('trip_id', 'int8', (col) => col.notNull().unsigned())
      .addForeignKeyConstraint('sender_notice_id_fk', ['sender_id'], 'user', [
        'id',
      ])
      .addForeignKeyConstraint(
        'receiver_notice_id_fk',
        ['receiver_id'],
        'user',
        ['id'],
      )
      .addForeignKeyConstraint('trip_notice_id_fk', ['trip_id'], 'trip', ['id'])
      .execute();

    await trx.schema
      .createTable('messaging')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('comment', 'text', (col) => col.notNull())
      .addColumn('date', 'datetime', (col) => col.notNull())
      .addColumn('sender_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('receiver_id', 'int8', (col) => col.notNull().unsigned())
      .addColumn('message_read_at', 'datetime', (col) => col.notNull())
      .addForeignKeyConstraint('sender_message_id_fk', ['sender_id'], 'user', [
        'id',
      ])
      .addForeignKeyConstraint(
        'receiver_message_id_fk',
        ['receiver_id'],
        'user',
        ['id'],
      )
      .execute();
  });
}
