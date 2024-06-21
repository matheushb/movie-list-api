import { Module } from '@nestjs/common';
import { MovieListService } from './movie-list.service';
import { MovieListController } from './movie-list.controller';
import { MovieListRepository } from './movie-list.repository';

@Module({
  controllers: [MovieListController],
  providers: [MovieListService, MovieListRepository],
})
export class MovieListModule {}
