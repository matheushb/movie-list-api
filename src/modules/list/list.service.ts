import { ListFilterParams } from '@/common/decorators/list-filter-params.decorator';
import { PaginationParams } from '@/common/decorators/pagination.decorator';
import { Paginator } from '@/common/utils/pagination';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListRepository } from './list.repository';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly paginator: Paginator,
  ) {}

  async create(createListDto: CreateListDto) {
    return this.listRepository.create(createListDto);
  }

  async findAll(
    pagination: PaginationParams,
    listFilterParams: ListFilterParams,
  ) {
    const query = this.parseFilters(listFilterParams);

    return this.listRepository.findAll(pagination, query);
  }

  async findOne(id: string) {
    const list = await this.listRepository.findOne(id);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return list;
  }

  async update(id: string, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  async remove(id: string) {
    return this.listRepository.remove(id);
  }

  async rate(id: string, rating: number) {
    if (rating < 1 || rating > 10)
      throw new BadRequestException('Rating must be between 1 and 10');

    const list = await this.findOne(id);

    const newAvgRating =
      (list.rating * list.ratingCount + rating) / (list.ratingCount + 1);

    return await this.update(id, {
      rating: newAvgRating,
      ratingCount: list.ratingCount + 1,
    });
  }

  private parseFilters(
    movieFilterParams: ListFilterParams,
  ): Prisma.ListWhereInput {
    const queries: Prisma.ListWhereInput[] = [];

    queries.push({
      isPublic: true,
    });

    if (movieFilterParams.ratingGte && movieFilterParams.ratingLte) {
      if (
        Number(movieFilterParams.ratingGte) >
        Number(movieFilterParams.ratingLte)
      ) {
        throw new BadRequestException(
          'ratingGte must be less than or equal to ratingLte',
        );
      }
      queries.push({
        rating: {
          gte: Number(movieFilterParams.ratingGte),
          lte: Number(movieFilterParams.ratingLte),
        },
      });
    }

    if (movieFilterParams.ratingGte && !movieFilterParams.ratingLte) {
      queries.push({
        rating: {
          gte: Number(movieFilterParams.ratingGte),
        },
      });
    }

    if (!movieFilterParams.ratingGte && movieFilterParams.ratingLte) {
      queries.push({
        rating: {
          lte: Number(movieFilterParams.ratingLte),
        },
      });
    }

    if (movieFilterParams.title) {
      queries.push({
        title: {
          contains: movieFilterParams.title,
          mode: 'insensitive',
        },
      });
    }

    return {
      AND: queries,
    };
  }
}
