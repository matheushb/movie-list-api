import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MovieModule } from '../movie/movie.module';
import { MovieDbGateway } from 'src/gateways/moviedb/moviedb.gateway';

@Module({
  imports: [MovieModule],
  controllers: [SeedController],
  providers: [SeedService, MovieDbGateway],
})
export class SeedModule {}
