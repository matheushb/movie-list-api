import { Paginator } from '@/common/utils/pagination';
import { Module } from '@nestjs/common';
import { MovieListController } from './movie-list.controller';
import { MovieListRepository } from './movie-list.repository';
import { MovieListService } from './movie-list.service';

@Module({
  controllers: [MovieListController],
  providers: [MovieListService, MovieListRepository, Paginator],
})
export class MovieListModule {}
