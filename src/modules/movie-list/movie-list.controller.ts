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
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { MovieListService } from './movie-list.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('movie-list')
@Controller('movie-list')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @ApiBody({ type: CreateMovieListDto })
  @Post()
  create(@Body() createMovieListDto: CreateMovieListDto) {
    return this.movieListService.create(createMovieListDto);
  }

  @ApiPagination()
  @Get()
  findAll(@Pagination() pagination: PaginationParams) {
    return this.movieListService.findAll(pagination);
  }

  @Get('movie/:movieId/list/:listId')
  findOne(@Param('movieId') movieId: string, @Param('listId') listId: string) {
    return this.movieListService.findOne(movieId, listId);
  }

  @ApiBody({ type: UpdateMovieListDto })
  @Patch('movie/:movieId/list/:listId')
  update(
    @Param('movieId') movieId: string,
    @Param('listId') listId: string,
    @Body() updateMovieListDto: UpdateMovieListDto,
  ) {
    return this.movieListService.update(movieId, listId, updateMovieListDto);
  }

  @Delete('movie/:movieId/list/:listId')
  remove(@Param('movieId') movieId: string, @Param('listId') listId: string) {
    return this.movieListService.remove(movieId, listId);
  }
}
