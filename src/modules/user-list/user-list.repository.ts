import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';

@Injectable()
export class UserListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserListDto: CreateUserListDto) {
    return this.prismaService.userList.create({
      data: createUserListDto,
    });
  }

  findAll() {
    return this.prismaService.userList.findMany();
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
