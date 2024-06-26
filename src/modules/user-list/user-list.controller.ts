import {
  ApiPagination,
  Pagination,
  PaginationParams,
} from '@/common/decorators/pagination.decorator';
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';
import { UserListService } from './user-list.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('user-list')
@Controller('user-list')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @ApiBody({ type: CreateUserListDto })
  @Post()
  create(@Body() createUserListDto: CreateUserListDto) {
    return this.userListService.create(createUserListDto);
  }

  @Get()
  @ApiPagination()
  findAll(@Pagination() pagination: PaginationParams) {
    return this.userListService.findAll(pagination);
  }

  @Get('user/:userId/list/:listId')
  findOne(@Param('userId') userId: string, @Param('listId') listId: string) {
    return this.userListService.findOne(userId, listId);
  }

  @ApiBody({ type: UpdateUserListDto })
  @Patch('user/:userId/list/:listId')
  update(
    @Param('userId') userId: string,
    @Param('listId') listId: string,
    @Body() updateUserListDto: UpdateUserListDto,
  ) {
    return this.userListService.update(userId, listId, updateUserListDto);
  }

  @Delete('user/:userId/list/:listId')
  remove(@Param('userId') userId: string, @Param('listId') listId: string) {
    return this.userListService.remove(userId, listId);
  }
}
