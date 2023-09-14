import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('APP_SECRET'),
    });
  }

  /**
   *
   * TODO: Do further token validation, looking up the publicId in a list of revoked tokens,
   * enabling us to perform token revocation.
   */

  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new NotFoundException('Provided auth user not found', user);
    }

    return {
      tokenObj: {
        id: payload.sub,
      },
      ...user,
    };
  }
}
