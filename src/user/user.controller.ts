import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
}