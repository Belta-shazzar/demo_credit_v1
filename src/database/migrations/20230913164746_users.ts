import { Knex } from 'knex';

const tableName = 'user';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id');
    table.string('full_name');
    table.string('email').notNullable().unique();
    table.string('password');
    table.string('email_verified_at');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
