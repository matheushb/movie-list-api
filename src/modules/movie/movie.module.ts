import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { Paginator } from 'src/common/utils/pagination';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, Paginator],
  exports: [MovieService],
})
export class MovieModule {}
