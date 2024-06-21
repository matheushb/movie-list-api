import { Injectable } from '@nestjs/common';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MovieListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMovieListDto: CreateMovieListDto) {
    return this.prismaService.movieList.create({
      data: createMovieListDto,
    });
  }

  findAll() {
    return this.prismaService.movieList.findMany();
  }

  findOne(movieId: string, listId: string) {
    return this.prismaService.movieList.findUnique({
      where: {
        listId_movieId: {
          listId,
          movieId,
        },
      },
    });
  }

  update(
    movieId: string,
    listId: string,
    updateMovieListDto: UpdateMovieListDto,
  ) {
    return this.prismaService.movieList.update({
      where: {
        listId_movieId: {
          listId,
          movieId,
        },
      },
      data: updateMovieListDto,
    });
  }

  remove(movieId: string, listId: string) {
    return this.prismaService.movieList.delete({
      where: {
        listId_movieId: {
          listId,
          movieId,
        },
      },
    });
  }
}
