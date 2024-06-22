import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MovieModule } from '../movie/movie.module';
import { MovieDbGateway } from 'src/gateways/moviedb/moviedb.gateway';
import { UserModule } from '../user/user.module';
import { ListModule } from '../list/list.module';
import { MovieListModule } from '../movie-list/movie-list.module';

@Module({
  imports: [UserModule, MovieModule, ListModule, MovieListModule],
  controllers: [SeedController],
  providers: [SeedService, MovieDbGateway],
})
export class SeedModule {}
