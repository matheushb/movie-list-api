import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListRepository } from './list.repository';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  create(createListDto: CreateListDto) {
    return this.listRepository.create(createListDto);
  }

  findAll() {
    return this.listRepository.findAll();
  }

  findOne(id: string) {
    return this.listRepository.findOne(id);
  }

  update(id: string, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  remove(id: string) {
    return this.listRepository.remove(id);
  }
}
