import { PaginationParams } from '@/common/decorators/pagination.decorator';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Paginator } from '@/common/utils/pagination';
import { Injectable } from '@nestjs/common';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';

@Injectable()
export class UserListRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginator: Paginator,
  ) {}

  create(createUserListDto: CreateUserListDto) {
    return this.prismaService.userList.create({
      data: createUserListDto,
    });
  }

  findOne(userId: string, listId: string) {
    return this.prismaService.userList.findUnique({
      where: {
        userId_listId: {
          userId,
          listId,
        },
      },
    });
  }

  findAll(pagination: PaginationParams) {
    return this.paginator.paginate(
      'userList',
      pagination.page,
      pagination.pageSize,
    );
  }

  update(userId: string, listId: string, updateUserListDto: UpdateUserListDto) {
    return this.prismaService.userList.update({
      where: {
        userId_listId: {
          userId,
          listId,
        },
      },
      data: updateUserListDto,
    });
  }

  remove(userId: string, listId: string) {
    return this.prismaService.userList.delete({
      where: {
        userId_listId: {
          userId,
          listId,
        },
      },
    });
  }
}
