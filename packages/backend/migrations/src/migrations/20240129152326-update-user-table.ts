import type { Kysely } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .addColumn('is_baby_allowed', 'boolean', (col) => col.notNull())
      .addColumn('is_non_vaccinated_allowed', 'boolean', (col) => col.notNull())
      .addColumn('is_animal_allowed', 'boolean', (col) => col.notNull())
      .addColumn('is_smoker_allowed', 'boolean', (col) => col.notNull())
      .addColumn('selected_musics', 'varchar(255)', (col) =>
        col.defaultTo(
          JSON.stringify({
            rock: false,
            jazz: false,
            rap: false,
            rnb: false,
            pop: false,
          }),
        ),
      )
      .addColumn('selected_languages', 'varchar(255)', (col) =>
        col.defaultTo(
          JSON.stringify({
            english: false,
            spanish: false,
            deutsch: false,
            french: false,
          }),
        ),
      )
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .dropColumn('is_baby_allowed')
      .dropColumn('is_non_vaccinated_allowed')
      .dropColumn('is_animal_allowed')
      .dropColumn('is_smoker_allowed')
      .dropColumn('selected_musics')
      .dropColumn('selected_languages')
      .execute();
  });
}
