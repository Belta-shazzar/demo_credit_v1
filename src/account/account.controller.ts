import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { FundAccountDto } from './dto/fundAccount.dto';
import {
  CurrentUser,
  IDecoratorUser,
} from 'src/common/decorators/current-user.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('fund-account')
  fundAccount(
    @Body() data: FundAccountDto,
    @CurrentUser() user: IDecoratorUser,
  ) {
    console.log("USER --- %o", user);
    
    return this.accountService.fundAccount(data, user);
  }
}
