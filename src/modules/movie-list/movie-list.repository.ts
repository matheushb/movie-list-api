import { Injectable } from '@nestjs/common';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Paginator } from 'src/common/utils/pagination';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

@Injectable()
export class MovieListRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginator: Paginator,
  ) {}

  create(createMovieListDto: CreateMovieListDto) {
    return this.prismaService.movieList.create({
      data: createMovieListDto,
    });
  }

  findAll(pagination: PaginationParams) {
    return this.paginator.paginate(
      'movieList',
      pagination.page,
      pagination.pageSize,
    );
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
