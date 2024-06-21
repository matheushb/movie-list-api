import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
    return this.prismaService.movie.create({
      data: createMovieDto,
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

  remove(id: string) {
    return this.prismaService.movie.delete({
      where: { id },
    });
  }
}
