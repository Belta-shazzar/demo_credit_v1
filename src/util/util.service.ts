import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
    constructor(private config: ConfigService) {}

  public async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
