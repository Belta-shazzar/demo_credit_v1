import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

interface User {
  id: string;
  full_name: string;
  email: string;
  password: string;
}

export class UserRepository {
  private tableName = 'user';
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(data: User) {
    await this.knex.table(this.tableName).insert(data);

    const user = await this.knex
      .table('user')
      .select('id', 'full_name', 'email', 'created_at')
      .where('id', '=', data.id);

    return user[0];
  }

  async getUserByEmail(email: string) {
    const users = await this.knex
      .table(this.tableName)
      .where('email', '=', email);
    return users[0];
  }

  async getUserById(userId: string) {
    const users = await this.knex
      .table(this.tableName)
      .where('id', '=', userId);
    return users[0];
  }
}
