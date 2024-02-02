// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('reservation_seat')
      .dropConstraint('reservation_id_fk')
      .execute();
    await trx.schema
      .alterTable('reservation_seat')
      .dropColumn('reservation_id')
      .execute();
    await trx.schema
      .alterTable('reservation_seat')
      .addColumn('reservation_id', 'int8', (col) => col.unsigned())
      .execute();
    await trx.schema
      .alterTable('reservation_seat')
      .addForeignKeyConstraint(
        'reservation_id_fk',
        ['reservation_id'],
        'reservation',
        ['id'],
      )
      .execute();
    await trx.schema
      .alterTable('checkpoint_trip')
      .addColumn('kilometer', 'decimal(6, 1)', (col) =>
        col.notNull().unsigned(),
      )
      .addColumn('travel_time', 'int2', (col) => col.notNull())
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('checkpoint_trip')
      .dropColumn('kilometer')
      .execute();
    await trx.schema
      .alterTable('checkpoint_trip')
      .dropColumn('travel_time')
      .execute();
    await trx.schema
      .alterTable('reservation_seat')
      .modifyColumn('reservation_id', 'int8', (col) => col.notNull().unsigned())
      .execute();
  });
}
