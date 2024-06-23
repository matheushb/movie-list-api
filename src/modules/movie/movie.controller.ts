import {
  HasMovieFilterQuery,
  MovieFilter,
  MovieFilterParams,
} from '@/common/decorators/movie-filter-params.decorator';
import {
  ApiPagination,
  Pagination,
  PaginationParams,
} from '@/common/decorators/pagination.decorator';
import { UserFromRequest } from '@/common/decorators/user-from-request.decorator';
import { RateDto } from '@/common/dtos/rate-dto';
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
import { JwtPayload } from '../auth/strategies/jwt.strategy';
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

  @Get('top-rated')
  getTopRated() {
    return this.movieService.findTopRated();
  }

  @Post(':id/rate')
  @ApiBody({
    type: RateDto,
    description: 'Rota para avaliar movies, rating > 1 & rating < 0',
  })
  rate(@Param('id') id: string, @Body() rate: { rating: number }) {
    return this.movieService.rate(id, rate.rating);
  }

  @Get('recommendations')
  getRecommendations(@UserFromRequest() user: JwtPayload) {
    return this.movieService.getRecommendations(user);
  }

  @Get()
  @HasMovieFilterQuery()
  @ApiPagination()
  findAll(
    @MovieFilter() movieFilterParams: MovieFilterParams,
    @Pagination() pagination: PaginationParams,
  ) {
    return this.movieService.findAll(movieFilterParams, pagination);
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
