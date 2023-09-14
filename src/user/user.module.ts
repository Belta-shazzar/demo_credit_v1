import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { AccountModule } from 'src/account/account.module';
import { UserRepository } from './user.repository';

@Module({
    imports: [AccountModule],
    providers: [UsersService, UserRepository],
    controllers: [UsersController],
    exports: [UsersService]
    
})
export class UserModule {}
