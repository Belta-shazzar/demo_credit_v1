import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';

@Module({
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule {}
