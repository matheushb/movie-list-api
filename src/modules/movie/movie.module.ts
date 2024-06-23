import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { UserModule } from '../user/user.module';
import { Paginator } from '@/common/utils/pagination';

@Module({
  imports: [UserModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, Paginator],
  exports: [MovieService],
})
export class MovieModule {}
