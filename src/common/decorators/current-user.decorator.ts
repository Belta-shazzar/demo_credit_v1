import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from 'src/user/user.interface';
export type IDecoratorUser = IUser;
export const extractUser = (request): IDecoratorUser => request['user'];

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? extractUser(request)[data] : extractUser(request);
  },
);
