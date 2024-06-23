import { Language } from '@/modules/movie/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class LanguageDto {
  @ApiProperty({ enum: Language, type: 'array', example: [Language.PT] })
  @IsEnum(Language, { each: true })
  @IsNotEmpty()
  language: Language[];
}
