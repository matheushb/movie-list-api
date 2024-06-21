import { Injectable } from '@nestjs/common';
import { UserListRepository } from './user-list.repository';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';

@Injectable()
export class UserListService {
  constructor(private readonly userListRepository: UserListRepository) {}

  create(createUserListDto: CreateUserListDto) {
    return this.userListRepository.create(createUserListDto);
  }

  findAll() {
    return this.userListRepository.findAll();
  }

  findOne(userId: string, listId: string) {
    return this.userListRepository.findOne(userId, listId);
  }

  update(userId: string, listId: string, updateUserListDto: UpdateUserListDto) {
    return this.userListRepository.update(userId, listId, updateUserListDto);
  }

  remove(userId: string, listId: string) {
    return this.userListRepository.remove(userId, listId);
  }
}
