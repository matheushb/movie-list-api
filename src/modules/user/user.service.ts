import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_SELECT_FIELDS, UserRepository } from './user.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { isDate } from 'class-validator';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { Paginator } from 'src/common/utils/pagination';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly paginator: Paginator,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.birthDate && !isDate(createUserDto.birthDate)) {
      createUserDto.birthDate = new Date(createUserDto.birthDate);
    }

    createUserDto.password = await this.bcryptService.hash(
      createUserDto.password,
    );

    return await this.userRepository.create(createUserDto);
  }

  async findAll(pagination: PaginationParams) {
    return await this.paginator.paginate(
      'user',
      pagination.page,
      pagination.pageSize,
      USER_SELECT_FIELDS,
    );
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async userExists(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    return !!user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.bcryptService.hash(
        updateUserDto.password,
      );
    }
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
