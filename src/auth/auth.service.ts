import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/requestDTO/signUp.dto';
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
        throw new ConflictException(`${email} already registered`);
      }

      const hash = await this.utilService.hashPassword(password);

      const user = await this.userService.create({
        ...data,
        password: hash,
      });

      const token = await this.utilService.generateToken(user.user.id);

      return {
        status: 201,
        message: 'created successfully',
        data: { user, token },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new HttpException('internal server error', HttpStatus.BAD_REQUEST, error);
    }
  }
}
