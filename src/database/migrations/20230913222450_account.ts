import { Knex } from 'knex';

const tableName = 'account';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table
      .uuid('user_id')
      .unique()
      .notNullable()
      .references('id')
      .inTable('user');
    table.string('account_number').notNullable().unique();
    table.decimal('balance', 10, 2).notNullable().defaultTo(0.0);
    table.string('currency').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
