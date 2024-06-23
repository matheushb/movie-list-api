import { PaginationParams } from '@/common/decorators/pagination.decorator';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Paginator } from '@/common/utils/pagination';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginator: Paginator,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return this.prismaService.movie.create({
      data: createMovieDto,
    });
  }

  findTopRated() {
    return this.prismaService.movie.findMany({
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });
  }

  findOne(id: string) {
    return this.prismaService.movie.findUnique({
      where: { id },
    });
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.prismaService.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  findAll(pagination: PaginationParams, query: Prisma.MovieWhereInput) {
    return this.paginator.paginate(
      'movie',
      pagination.page,
      pagination.pageSize,
      null,
      query,
    );
  }

  remove(id: string) {
    return this.prismaService.movie.delete({
      where: { id },
    });
  }
}
