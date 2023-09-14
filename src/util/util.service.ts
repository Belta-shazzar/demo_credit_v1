import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilService {
    constructor(private config: ConfigService) {}

  public async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  public async generateToken(userId: string) {
    const jwtPayload = {
      userId,
    };
    const options = { expiresIn: '6h' };

    return new Promise((resolve, reject) => {
      jwt.sign(
        jwtPayload,
        this.config.get('APP_SECRET'),
        options,
        (err: any, token: string | undefined) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
