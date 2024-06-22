import { Injectable, NotFoundException } from '@nestjs/common';
import { isDate } from 'class-validator';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserFilterParams } from 'src/common/decorators/user-filter-params.decorator';
import { Prisma } from '@prisma/client';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { GenreDto } from './dto/add-favorite-genre.dto';

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

  async addFavoriteGenre(addFavoriteGenreDto: GenreDto, user: JwtPayload) {
    const foundUser = await this.userRepository.findOne(user.sub);

    console.log('user > ', foundUser.favoriteGenres);

    for (const genre of foundUser.favoriteGenres) {
      if (!addFavoriteGenreDto.genre.includes(genre as any)) {
        addFavoriteGenreDto.genre.push(genre as any);
      }
    }

    return await this.userRepository.update(user.sub, {
      favoriteGenres: addFavoriteGenreDto.genre,
    });
  }

  async removeFavoriteGenre(
    removeFavoriteGenreDto: GenreDto,
    user: JwtPayload,
  ) {
    const foundUser = await this.userRepository.findOne(user.sub);

    const newGenres = foundUser.favoriteGenres.filter(
      (genre) => !removeFavoriteGenreDto.genre.includes(genre as any),
    );

    return await this.userRepository.update(user.sub, {
      favoriteGenres: newGenres as any,
    });
  }

  async findAll(
    pagination: PaginationParams,
    userFilterParams: UserFilterParams,
  ) {
    const query = this.parseFilters(userFilterParams);

    return await this.userRepository.findAll(pagination, query);
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

  private parseFilters(
    userFilterParams: UserFilterParams,
  ): Prisma.UserWhereInput {
    const queries = [];

    if (userFilterParams.name) {
      queries.push({
        name: {
          contains: userFilterParams.name,
          mode: 'insensitive',
        },
      });
    }

    return {
      AND: queries,
    };
  }
}
