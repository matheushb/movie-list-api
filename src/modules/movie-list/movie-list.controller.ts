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
import { MovieListService } from './movie-list.service';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

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

  @Get()
  findAll() {
    return this.movieListService.findAll();
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