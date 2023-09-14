import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AccountInterface } from './account.interface';
import { omit } from 'lodash';
export class AccountRepository {
  private tableName = 'account';
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(data: Partial<AccountInterface>) {
    await this.knex.table('account').insert(data);

    const account = await this.knex
      .table(this.tableName)
      .select('*')
      .where('id', '=', data.id);

    return account[0];
  }

  async getAccountByUserId(userId: string) {
    const account = await this.knex
      .table(this.tableName)
      .where('user_id', '=', userId);

    return account[0];
  }

  async getAccountById(accountId: string) {
    const account = await this.knex
      .table(this.tableName)
      .where('id', '=', accountId);

    return account[0];
  }

  async updateAccountById(accountId: string, data: Partial<AccountInterface>) {
    await this.knex
      .table(this.tableName)
      .where('id', '=', accountId)
      .update(data)

    return await this.getAccountById(accountId);
  }
}
