import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

interface User {
  id: string;
  full_name: string;
  email: string;
  password: string;
}

export class UserRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(data: User) {
    await this.knex.table('user').insert(data);

    const user = await this.knex
      .table('user')
      .select('id', 'full_name', 'email', 'created_at')
      .where('id', '=', data.id);

    return user[0];
  }

  async getUserByEmail(email: string) {
    const users = await this.knex.table('user').where('email', '=', email);
    return users[0];
  }
}
