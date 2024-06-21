import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movie.repository';
import { isDate } from 'class-validator';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async create(createMovieDto: CreateMovieDto) {
    if (createMovieDto.releaseDate && !isDate(createMovieDto.releaseDate)) {
      createMovieDto.releaseDate = new Date(createMovieDto.releaseDate);
    }
    return await this.movieRepository.create(createMovieDto);
  }

  async findAll(pagination: PaginationParams) {
    return await this.movieRepository.findAll(pagination);
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
}
