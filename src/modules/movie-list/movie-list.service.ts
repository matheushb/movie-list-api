import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { MovieListRepository } from './movie-list.repository';
import { Paginator } from 'src/common/utils/pagination';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

@Injectable()
export class MovieListService {
  constructor(
    private readonly movieListRepository: MovieListRepository,
    private readonly paginator: Paginator,
  ) {}

  async create(createMovieListDto: CreateMovieListDto) {
    return this.movieListRepository.create(createMovieListDto);
  }

  async findAll(pagination: PaginationParams) {
    return this.paginator.paginate(
      'movieList',
      pagination.page,
      pagination.pageSize,
    );
  }

  async findOne(movieId: string, listId: string) {
    const movieList = await this.movieListRepository.findOne(movieId, listId);
    if (!movieList) {
      throw new NotFoundException('Movie list not found');
    }
    return movieList;
  }

  async update(
    movieId: string,
    listId: string,
    updateMovieListDto: UpdateMovieListDto,
  ) {
    return this.movieListRepository.update(movieId, listId, updateMovieListDto);
  }

  async remove(movieId: string, listId: string) {
    return this.movieListRepository.remove(movieId, listId);
  }
}
