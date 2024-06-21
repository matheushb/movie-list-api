import { Injectable, NotFoundException } from '@nestjs/common';
import { UserListRepository } from './user-list.repository';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';
import { Paginator } from 'src/common/utils/pagination';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

@Injectable()
export class UserListService {
  constructor(
    private readonly userListRepository: UserListRepository,
    private readonly paginator: Paginator,
  ) {}

  async create(createUserListDto: CreateUserListDto) {
    return this.userListRepository.create(createUserListDto);
  }

  async findAll(pagination: PaginationParams) {
    return this.paginator.paginate(
      'userList',
      pagination.page,
      pagination.pageSize,
    );
  }

  async findOne(userId: string, listId: string) {
    const userList = await this.userListRepository.findOne(userId, listId);
    if (!userList) {
      throw new NotFoundException('User list not found');
    }
    return userList;
  }

  async update(
    userId: string,
    listId: string,
    updateUserListDto: UpdateUserListDto,
  ) {
    return this.userListRepository.update(userId, listId, updateUserListDto);
  }

  async remove(userId: string, listId: string) {
    return this.userListRepository.remove(userId, listId);
  }
}
