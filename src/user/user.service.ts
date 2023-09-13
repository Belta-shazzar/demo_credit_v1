import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { fullName, email, password } = createUserDto;
      const users = await this.knex
        .table('user')
        .insert({ id: uuidv4(), email, password, full_name: fullName });

      return users;
    } catch (err) {
      console.log(err);

      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string) {
    const users = await this.knex.table('user').where('email', email);
    return users[0];
  }
}
