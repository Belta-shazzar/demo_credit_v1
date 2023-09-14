import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

interface Account {
  id: string;
  user_id: string;
  account_number: string;
  currency: string;
}

export class AccountRepository {
  private tableName = 'account';
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(data: Account) {
    await this.knex.table('account').insert(data);

    const account = await this.knex
      .table(this.tableName)
      .select('id', 'account_number', 'balance', 'currency')
      .where('id', '=', data.id);

    return account[0];
  }

  async getAccountByUserId(userId: string) {
    const account = await this.knex
      .table(this.tableName)
      .where('user_id', '=', userId);

    return account[0];
  }
}
