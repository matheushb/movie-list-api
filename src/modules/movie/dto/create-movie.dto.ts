import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinDate,
} from 'class-validator';
import { Genre, Language } from '../entities/movie.entity';

export class CreateMovieDto {
  @IsString()
  @MaxLength(200)
  @ApiProperty({ example: 'The Shawshank Redemption' })
  title: string;

  @IsString()
  @MaxLength(300)
  @ApiProperty({
    example:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  })
  overview: string;

  @IsDateString()
  @MinDate(new Date(1896, 12, 28))
  @ApiProperty({ example: '1994-09-10' })
  releaseDate: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  adult: boolean;

  @IsEnum(Language)
  @ApiProperty({ example: Language.EN, enum: Language })
  language: Language;

  @IsEnum(Genre)
  @ApiProperty({ example: Genre.DRAMA, enum: Genre })
  genre: Genre;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 142 })
  duration: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({ example: 9.3 })
  rating: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 23456 })
  ratingCount: number;
}
