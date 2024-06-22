import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export type ListFilterParams = {
  title: string;
  ratingGte: string;
  ratingLte: string;
};

export const ListFilter = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      title: request.query.title,
      ratingGte: request.query.ratingGte,
      ratingLte: request.query.ratingLte,
    };
  },
);

export const HasListFilterQuery = () => {
  return applyDecorators(
    ApiQuery({ name: 'title', type: String, required: false }),
    ApiQuery({ name: 'ratingGte', type: Number, required: false }),
    ApiQuery({ name: 'ratingLte', type: Number, required: false }),
  );
};
