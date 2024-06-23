import { Genre } from '@/modules/movie/entities/movie.entity';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export type MovieFilterParams = {
  title: string;
  genre: string;
  ratingGte: string;
  ratingLte: string;
  adult: string;
};

export const MovieFilter = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      title: request.query.title,
      genre: request.query.genre,
      ratingGte: request.query.ratingGte,
      ratingLte: request.query.ratingLte,
      adult: request.query.adult,
    };
  },
);

export const HasMovieFilterQuery = () => {
  return applyDecorators(
    ApiQuery({ name: 'title', type: String, required: false }),
    ApiQuery({
      name: 'genre',
      type: String,
      required: false,
      enum: Genre,
    }),
    ApiQuery({ name: 'ratingGte', type: Number, required: false }),
    ApiQuery({ name: 'ratingLte', type: Number, required: false }),
    ApiQuery({ name: 'adult', type: Boolean, required: false }),
  );
};
