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
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  ratingCount: number;
}
