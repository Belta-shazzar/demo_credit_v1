import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepo: AccountRepository) {}
  async createAccount(data: any) {
    try {
      const account_number =
        1 +
        Math.floor(Math.random() * 9) +
        Math.random()
          .toFixed(10 - 1)
          .split('.')[1];

      const account = await this.accountRepo.create({
        id: uuid(),
        user_id: data.id,
        account_number,
        currency: 'NGN',
      });

      return account;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  async getAccountByUserId(userId: string) {
    try {
      return await this.accountRepo.getAccountByUserId(userId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
