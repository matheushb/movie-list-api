import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { ListModule } from './modules/list/list.module';
import { MovieListModule } from './modules/movie-list/movie-list.module';
import { UserListModule } from './modules/user-list/user-list.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MovieModule,
    ListModule,
    UserListModule,
    MovieListModule,
    PrismaModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
