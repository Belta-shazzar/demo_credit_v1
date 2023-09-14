import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}