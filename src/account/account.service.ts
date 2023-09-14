import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from 'src/transaction/dto/requestDTO/createAccount.dto';
import { v4 as uuid } from 'uuid';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepo: AccountRepository) {}
  async createAccount(data: CreateAccountDto) {
    try {
      const account_number =
        1 +
        Math.floor(Math.random() * 9) +
        Math.random()
          .toFixed(10 - 1)
          .split('.')[1];

      const account = await this.accountRepo.create({
        id: uuid(),
        user_id: data.userId,
        account_number,
        currency: 'NGN',
      });

      return account;
    } catch (error) {
        console.log(error);
        throw new HttpException('internal server error', HttpStatus.BAD_REQUEST, error);
    }
  }
}
