import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../user.dto';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
