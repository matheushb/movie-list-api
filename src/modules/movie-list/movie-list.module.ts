import { Module } from '@nestjs/common';
import { MovieListService } from './movie-list.service';
import { MovieListController } from './movie-list.controller';
import { MovieListRepository } from './movie-list.repository';
import { Paginator } from 'src/common/utils/pagination';

@Module({
  controllers: [MovieListController],
  providers: [MovieListService, MovieListRepository, Paginator],
})
export class MovieListModule {}
