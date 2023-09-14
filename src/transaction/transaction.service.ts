import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly accountRepo: TransactionRepository) {}

  async createTransaction(data: any) {
    try {
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
