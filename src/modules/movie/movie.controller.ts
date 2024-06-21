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
import { RateDto } from 'src/common/dtos/rate-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiBody({ type: CreateMovieDto })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Post(':id/rate')
  @ApiBody({ type: RateDto })
  rate(@Param('id') id: string, @Body() rate: { rating: number }) {
    return this.movieService.rate(id, rate.rating);
  }

  @Get()
  @ApiPagination()
  findAll(@Pagination() pagination: PaginationParams) {
    return this.movieService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @ApiBody({ type: CreateMovieDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
