import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ApiPagination,
  Pagination,
  PaginationParams,
} from 'src/common/decorators/pagination.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import {
  HasUserFilterQuery,
  UserFilter,
  UserFilterParams,
} from 'src/common/decorators/user-filter-params.decorator';
import { UserFromRequest } from 'src/common/decorators/user-from-request.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { GenreDto } from './dto/add-favorite-genre.dto';
import { CreateUserDto } from './dto/create-user.dto';
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

  @Post('add-favorite-genre')
  @ApiBody({ type: GenreDto })
  addFavoriteGenre(
    @Body() addFavouriteGenresDto: GenreDto,
    @UserFromRequest() user: JwtPayload,
  ) {
    return this.userService.addFavoriteGenre(addFavouriteGenresDto, user);
  }

  @Post('remove-favorite-genre')
  @ApiBody({ type: GenreDto })
  removeFavoriteGenre(
    @Body() addFavouriteGenresDto: GenreDto,
    @UserFromRequest() user: JwtPayload,
  ) {
    return this.userService.removeFavoriteGenre(addFavouriteGenresDto, user);
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
