import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class Paginator {
  constructor(private prisma: PrismaService) {}

  async paginate(
    model: string,
    page: number = 1,
    pageSize: number = 10,
    select_fields?: object,
    query?: object,
  ) {
    const skip = (page - 1) * pageSize;

    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma[model].findMany({
        skip,
        take: pageSize,
        select: select_fields,
        where: query,
      }),
      this.prisma[model].count({ where: query }),
    ]);

    return {
      data: items,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
}
