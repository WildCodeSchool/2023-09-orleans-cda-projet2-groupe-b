// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('car')
      .dropConstraint('car_type_id_fk')
      .execute();
    await trx.schema
      .alterTable('car')
      .addColumn('brand', 'varchar(15)', (col) => col.notNull())
      .addColumn('model', 'varchar(25)', (col) => col.notNull())
      .dropColumn('car_type_id')
      .execute();
    await trx.schema.dropTable('car_type').execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .createTable('car_type')
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned(),
      )
      .addColumn('brand', 'varchar(15)', (col) => col.notNull())
      .addColumn('model', 'varchar(25)', (col) => col.notNull())
      .execute();
    await trx.schema
      .alterTable('car')
      .dropColumn('brand')
      .dropColumn('model')
      .addColumn('car_type_id', 'int8', (col) => col.notNull())
      .execute();

    await trx.schema
      .alterTable('car')
      .addForeignKeyConstraint('car_type_id_fk', ['car_type_id'], 'car_type', [
        'id',
      ])
      .execute();
  });
}
