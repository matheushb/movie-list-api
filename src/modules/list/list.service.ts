import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListRepository } from './list.repository';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { Paginator } from 'src/common/utils/pagination';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly paginator: Paginator,
  ) {}

  async create(createListDto: CreateListDto) {
    return this.listRepository.create(createListDto);
  }

  async findAll(pagination: PaginationParams) {
    return this.paginator.paginate(
      'list',
      pagination.page,
      pagination.pageSize,
    );
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
}
