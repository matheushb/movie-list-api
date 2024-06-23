import { Genre } from '@/modules/movie/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class GenreDto {
  @ApiProperty({ enum: Genre, type: 'array', example: [Genre.ACTION] })
  @IsEnum(Genre, { each: true })
  @IsNotEmpty()
  genre: Genre[];
}
