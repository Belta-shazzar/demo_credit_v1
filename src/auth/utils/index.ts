import { Injectable } from '@nestjs/common';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class Util {
  constructor(private readonly utilService: UtilService) {}
  public async authResponse(status: number, user: any) {
    const token = await this.utilService.generateToken(user.id);

    return {
      status: status,
      message: 'successful',
      data: { user, token },
    };
  }
}
