import {
  ApiPagination,
  Pagination,
  PaginationParams,
} from '@/common/decorators/pagination.decorator';
import { Public } from '@/common/decorators/public.decorator';
import {
  HasUserFilterQuery,
  UserFilter,
  UserFilterParams,
} from '@/common/decorators/user-filter-params.decorator';
import { UserFromRequest } from '@/common/decorators/user-from-request.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { GenreDto } from './dto/genre.dto';
import { LanguageDto } from './dto/language.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('add-favorite-genre')
  @ApiBody({ type: GenreDto })
  addFavoriteGenre(
    @Body() addFavouriteGenresDto: GenreDto,
    @UserFromRequest() user: JwtPayload,
  ) {
    return this.userService.addFavoriteGenre(addFavouriteGenresDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('remove-favorite-genre')
  @ApiBody({ type: GenreDto })
  removeFavoriteGenre(
    @Body() removeFavouriteGenresDto: GenreDto,
    @UserFromRequest() user: JwtPayload,
  ) {
    return this.userService.removeFavoriteGenre(removeFavouriteGenresDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('add-favorite-language')
  @ApiBody({ type: LanguageDto })
  addFavoriteLanguage(
    @Body() addFavouriteLanguageDto: LanguageDto,
    @UserFromRequest() user: JwtPayload,
  ) {
    return this.userService.addFavoriteLanguage(addFavouriteLanguageDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('remove-favorite-language')
  @ApiBody({ type: LanguageDto })
  removeFavoriteLanguage(
    @Body() removeFavouriteLanguageDto: LanguageDto,
    @UserFromRequest() user: JwtPayload,
  ) {
    return this.userService.removeFavoriteLanguage(
      removeFavouriteLanguageDto,
      user,
    );
  }

  @Get()
  @ApiPagination()
  @HasUserFilterQuery()
  findAll(
    @UserFilter() userFilterParams: UserFilterParams,
    @Pagination() pagination: PaginationParams,
  ) {
    return this.userService.findAll(pagination, userFilterParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
