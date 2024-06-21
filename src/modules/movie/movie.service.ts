import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movie.repository';
import { isDate } from 'class-validator';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { Paginator } from 'src/common/utils/pagination';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private paginator: Paginator,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    if (createMovieDto.releaseDate && !isDate(createMovieDto.releaseDate)) {
      createMovieDto.releaseDate = new Date(createMovieDto.releaseDate);
    }
    return this.movieRepository.create(createMovieDto);
  }

  async findAll(pagination: PaginationParams) {
    return this.paginator.paginate(
      'movie',
      pagination.page,
      pagination.pageSize,
    );
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

    return this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: string) {
    return this.movieRepository.remove(id);
  }
}
