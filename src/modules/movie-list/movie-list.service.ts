import { Injectable } from '@nestjs/common';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { MovieListRepository } from './movie-list.repository';

@Injectable()
export class MovieListService {
  constructor(private readonly movieListRepository: MovieListRepository) {}

  create(createMovieListDto: CreateMovieListDto) {
    return this.movieListRepository.create(createMovieListDto);
  }

  findAll() {
    return this.movieListRepository.findAll();
  }

  findOne(movieId: string, listId: string) {
    return this.movieListRepository.findOne(movieId, listId);
  }

  update(
    movieId: string,
    listId: string,
    updateMovieListDto: UpdateMovieListDto,
  ) {
    return this.movieListRepository.update(movieId, listId, updateMovieListDto);
  }

  remove(movieId: string, listId: string) {
    return this.movieListRepository.remove(movieId, listId);
  }
}
