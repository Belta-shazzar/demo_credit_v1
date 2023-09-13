import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UtilModule } from 'src/util/util.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule, UtilModule],
    providers: [ AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
