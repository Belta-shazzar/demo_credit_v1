import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AccountService } from 'src/account/account.service';
import { SignUpDto } from 'src/auth/dto/requestDTO/signUp.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository, 
    private readonly accountService: AccountService,
  ) {}

  async create(data: SignUpDto) {
    try {
      const { fullName, email, password } = data;
      const id = uuidv4();
      
      const user = await this.userRepo.create({ id, email, password, full_name: fullName });

      const account = await this.accountService.createAccount(user.id);

      return { user, account };
    } catch (error) {
      console.log(error);

      throw new HttpException('internal server error', HttpStatus.BAD_REQUEST, error);
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.getUserByEmail(email);
    return user;
  }
}
