import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { MovieDbGatewayModule } from './gateways/moviedb/moviedb.module';
import { ListModule } from './modules/list/list.module';
import { MovieListModule } from './modules/movie-list/movie-list.module';
import { UserListModule } from './modules/user-list/user-list.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MovieModule,
    ListModule,
    UserListModule,
    MovieListModule,
    MovieDbGatewayModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
