import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { Paginator } from 'src/common/utils/pagination';

export const USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  bio: true,
  favoriteGenres: true,
  favoriteLanguages: true,
  birthDate: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginator: Paginator,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
      select: USER_SELECT_FIELDS,
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  findAll(pagination: PaginationParams, query: Prisma.UserWhereInput) {
    return this.paginator.paginate(
      'user',
      pagination.page,
      pagination.pageSize,
      USER_SELECT_FIELDS,
      query,
    );
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: { ...USER_SELECT_FIELDS, password: true },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: USER_SELECT_FIELDS,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }
}
