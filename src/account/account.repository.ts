import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

interface Account {
  id: string;
  user_id: string;
  account_number: string;
  currency: string;
}

export class AccountRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(data: Account) {
    await this.knex.table('account').insert(data);

    const account = await this.knex
      .table('account')
      .select('id', 'account_number', 'balance', 'currency')
      .where('id', '=', data.id);

    return account[0];
  }
}
