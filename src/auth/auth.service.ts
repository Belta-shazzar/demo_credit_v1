import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/requestDTO/auth.dto';
import { UserService } from 'src/user/user.service';
import { UtilService } from 'src/util/util.service';
import { Util } from './utils';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly utilService: UtilService,
    private readonly util: Util
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

      // const token = await this.utilService.generateToken(user.user.id);

      // return {
      //   status: 201,
      //   message: 'created successfully',
      //   data: { user, token },
      // };
      return this.util.authResponse(201, user)
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  async signIn(data: SignInDto) {
    try {
      const { email, password } = data;

      const user = await this.userService.getUserByEmail(email);      

      if (!user) {
        throw new NotFoundException(`user with ${email} not found`);
      }

      const matchPassword = await this.utilService.checkPassword(
        password,
        user.password,
      );

      if (!matchPassword) {
        throw new UnauthorizedException('incorrect password');
      }

      const account = await this.userService.getAccountByUserId(user.id);

      const $user = { ...omit(user, 'password'), account }

      return this.util.authResponse(200, $user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
