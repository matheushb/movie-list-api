import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateListDto {
  @ApiProperty({ example: 'Melhores filmes de Ação' })
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  title: string;

  @ApiProperty({ example: 'Lista de filmes de ação' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({ example: 9.4 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({ example: 321 })
  @IsOptional()
  @IsInt()
  ratingCount: number;
}
