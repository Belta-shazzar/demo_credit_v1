import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

export class TransactionRepository {
    private tableName = 'transaction'
    constructor(@InjectModel() private readonly knex: Knex) {}
}