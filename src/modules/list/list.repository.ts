import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Paginator } from 'src/common/utils/pagination';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginate: Paginator,
  ) {}

  create(createListDto: CreateListDto) {
    return this.prismaService.list.create({
      data: createListDto,
    });
  }

  findOne(id: string) {
    return this.prismaService.list.findUnique({
      where: { id },
    });
  }

  findAll(pagination: PaginationParams, query: Prisma.ListWhereInput) {
    return this.paginate.paginate(
      'list',
      pagination.page,
      pagination.pageSize,
      null,
      query,
    );
  }

  update(id: string, updateListDto: UpdateListDto) {
    return this.prismaService.list.update({
      where: { id },
      data: updateListDto,
    });
  }

  remove(id: string) {
    return this.prismaService.list.delete({
      where: { id },
    });
  }
}
