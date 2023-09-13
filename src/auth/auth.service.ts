import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/user/user.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly utilService: UtilService,
  ) {}
  async signUp(data: SignUpDto) {
    try {
      const { email, password } = data;

      const userExist = await this.userService.getUserByEmail(email);

      if (userExist) {
        
      }

      const hash = await this.utilService.hashPassword(password);
      
      const user = await this.userService.create({
        ...data,
        password: hash,
      });

      return { user };
    } catch (error) {}
  }
}
