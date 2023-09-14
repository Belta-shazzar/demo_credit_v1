import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AccountRepository } from './account.repository';
import { FundAccountDto } from './dto/fundAccount.dto';
import { AccountInterface } from './account.interface';
import { IDecoratorUser } from 'src/common/decorators/current-user.decorator';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private readonly accountRepo: AccountRepository,
  ) {}
  async createAccount(data: any) {
    try {
      const account_number =
        1 +
        Math.floor(Math.random() * 9) +
        Math.random()
          .toFixed(10 - 1)
          .split('.')[1];

      const account: AccountInterface = await this.accountRepo.create({
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

  async fundAccount(data: FundAccountDto, user: IDecoratorUser) {
    try {
      // await this.knex.transaction(async (trx) => {
      const account: AccountInterface = await this.getAccountByUserId(user.id);
      if (account.currency !== data.currency) {
        throw new BadRequestException('currency not supported');
      }

      const newbalance = data.amount + account.balance;

      const $account = await this.accountRepo.updateAccountById(account.id, {
        balance: newbalance,
      });

      // create transaction record

      return {
        status: 200,
        message: 'successful',
        data: { account: $account },
      };
      // });
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
