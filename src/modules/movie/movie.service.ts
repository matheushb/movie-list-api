import { MovieFilterParams } from '@/common/decorators/movie-filter-params.decorator';
import { PaginationParams } from '@/common/decorators/pagination.decorator';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Genre, Prisma } from '@prisma/client';
import { isDate } from 'class-validator';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly userService: UserService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    if (createMovieDto.releaseDate && !isDate(createMovieDto.releaseDate)) {
      createMovieDto.releaseDate = new Date(createMovieDto.releaseDate);
    }
    return await this.movieRepository.create(createMovieDto);
  }

  async findTopRated() {
    return await this.movieRepository.findTopRated();
  }

  async getRecommendations(decodedPayload: JwtPayload) {
    const user = await this.userService.findOne(decodedPayload.sub);

    return await this.movieRepository.findAll(
      { page: 1, pageSize: 10 },
      {
        genre: { hasSome: user.favoriteGenres },
        language: { in: user.favoriteLanguages },
        rating: { gte: 7 },
      },
    );
  }

  async findAll(
    movieFilterParams: MovieFilterParams,
    pagination: PaginationParams,
  ) {
    const query = this.parseFilters(movieFilterParams);

    return await this.movieRepository.findAll(pagination, query);
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    if (updateMovieDto.releaseDate && !isDate(updateMovieDto.releaseDate)) {
      updateMovieDto.releaseDate = new Date(updateMovieDto.releaseDate);
    }

    return await this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: string) {
    return await this.movieRepository.remove(id);
  }

  async rate(id: string, rating: number) {
    if (rating < 1 || rating > 10)
      throw new BadRequestException('Rating must be between 1 and 10');
    const movie = await this.findOne(id);

    const newAvgRating =
      (movie.rating * movie.ratingCount + rating) / (movie.ratingCount + 1);

    return await this.update(id, {
      rating: newAvgRating,
      ratingCount: movie.ratingCount + 1,
    });
  }

  private parseFilters(
    movieFilterParams: MovieFilterParams,
  ): Prisma.MovieWhereInput {
    const queries: Prisma.MovieWhereInput[] = [];

    if (movieFilterParams.ratingGte && movieFilterParams.ratingLte) {
      if (
        Number(movieFilterParams.ratingGte) >
        Number(movieFilterParams.ratingLte)
      ) {
        throw new BadRequestException(
          'ratingGte must be less than or equal to ratingLte',
        );
      }
      queries.push({
        rating: {
          gte: Number(movieFilterParams.ratingGte),
          lte: Number(movieFilterParams.ratingLte),
        },
      });
    }

    if (movieFilterParams.ratingGte && !movieFilterParams.ratingLte) {
      queries.push({
        rating: {
          gte: Number(movieFilterParams.ratingGte),
        },
      });
    }

    if (!movieFilterParams.ratingGte && movieFilterParams.ratingLte) {
      queries.push({
        rating: {
          lte: Number(movieFilterParams.ratingLte),
        },
      });
    }

    if (movieFilterParams.title) {
      queries.push({
        title: {
          contains: movieFilterParams.title,
          mode: 'insensitive',
        },
      });
    }

    if (movieFilterParams.genre && movieFilterParams.genre in Genre) {
      queries.push({
        genre: { has: movieFilterParams.genre as Genre },
      });
    }

    if (movieFilterParams.adult) {
      queries.push({
        adult: movieFilterParams.adult === 'true',
      });
    }

    return {
      AND: queries,
    };
  }
}
