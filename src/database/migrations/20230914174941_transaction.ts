import { Knex } from 'knex';

const tableName = 'transaction';

export async function up(knex: Knex): Promise<void> {
    // return knex.schema.createTable(tableName, (table) => {
    //     table.uuid('id').primary()
    //     table.
    // })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
