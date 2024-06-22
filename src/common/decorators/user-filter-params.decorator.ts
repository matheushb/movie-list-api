import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export type UserFilterParams = {
  name: string;
};

export const UserFilter = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      name: request.query.name,
    };
  },
);

export const HasUserFilterQuery = () => {
  return applyDecorators(
    ApiQuery({ name: 'name', type: String, required: false }),
  );
};
