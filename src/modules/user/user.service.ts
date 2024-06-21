import { Injectable, NotFoundException } from '@nestjs/common';
import { isDate } from 'class-validator';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
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
    return await this.userRepository.findAll(pagination);
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
