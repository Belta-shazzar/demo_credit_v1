import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { AccountModule } from 'src/account/account.module';
import { UserRepository } from './user.repository';

@Module({
    imports: [AccountModule],
    providers: [UserService, UserRepository],
    controllers: [UsersController],
    exports: [UserService]
    
})
export class UserModule {}
