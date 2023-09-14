import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/requestDTO/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() data: SignUpDto) {

    return this.authService.signUp(data);
  }

  @Post('sign-in')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }
}
