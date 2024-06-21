import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class RateDto {
  @ApiProperty()
  @Min(1)
  @Max(10)
  rating: number;
}
