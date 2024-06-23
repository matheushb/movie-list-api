import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import { PaginationParams } from '@/common/decorators/pagination.decorator';
import { UserFilterParams } from '@/common/decorators/user-filter-params.decorator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { isDate } from 'class-validator';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { GenreDto } from './dto/genre.dto';
import { LanguageDto } from './dto/language.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.birthDate && !isDate(createUserDto.birthDate)) {
      createUserDto.birthDate = new Date(createUserDto.birthDate);
    }

    createUserDto.password = await this.bcryptService.hash(
      createUserDto.password,
    );

    const user = await this.userRepository.create(createUserDto);

    return {
      ...user,
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }

  async addFavoriteGenre(addFavoriteGenreDto: GenreDto, user: JwtPayload) {
    const foundUser = await this.userRepository.findOne(user.sub);

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

  async addFavoriteLanguage(
    addFavoriteLanguageDto: LanguageDto,
    user: JwtPayload,
  ) {
    const foundUser = await this.userRepository.findOne(user.sub);

    for (const language of foundUser.favoriteLanguages) {
      if (!addFavoriteLanguageDto.language.includes(language as any)) {
        addFavoriteLanguageDto.language.push(language as any);
      }
    }

    return await this.userRepository.update(user.sub, {
      favoriteLanguages: addFavoriteLanguageDto.language,
    });
  }

  async removeFavoriteLanguage(
    removeFavoriteLanguageDto: LanguageDto,
    user: JwtPayload,
  ) {
    const foundUser = await this.userRepository.findOne(user.sub);

    const newLanguages = foundUser.favoriteLanguages.filter(
      (language) =>
        !removeFavoriteLanguageDto.language.includes(language as any),
    );

    return await this.userRepository.update(user.sub, {
      favoriteLanguages: newLanguages as any,
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
