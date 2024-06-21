import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import {
  ApiPagination,
  Pagination,
  PaginationParams,
} from 'src/common/decorators/pagination.decorator';
import { RateDto } from 'src/common/dtos/rate-dto';

@ApiTags('list')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Post('rate/:id')
  @ApiBody({ type: RateDto })
  rate(@Param('id') id: string, @Body() rate: { rating: number }) {
    return this.listService.rate(id, rate.rating);
  }

  @Get()
  @ApiPagination()
  findAll(@Pagination() pagination: PaginationParams) {
    return this.listService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(id);
  }
}
