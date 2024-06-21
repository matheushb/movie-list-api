import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto);
  }

  findAll() {
    return this.movieRepository.findAll();
  }

  findOne(id: string) {
    return this.movieRepository.findOne(id);
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: string) {
    return this.movieRepository.remove(id);
  }
}
