import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Genre } from 'src/modules/movie/entities/movie.entity';

export class GenreDto {
  @ApiProperty({ enum: Genre, type: 'array', example: [Genre.ACTION] })
  @IsEnum(Genre, { each: true })
  @IsNotEmpty()
  genre: Genre[];
}
