import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'matheushbaraldi@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Matheus Baraldi' })
  @IsOptional()
  @MaxLength(35)
  name?: string;

  @IsString()
  @ApiProperty({ example: 'matheus123' })
  @MaxLength(30)
  @MinLength(4)
  password: string;

  @IsString()
  @ApiProperty({ example: 'Apaixonado em filmes de ação!' })
  @IsOptional()
  @MaxLength(250)
  bio?: string;

  @IsDateString()
  @ApiProperty({ example: '2003-03-12' })
  @IsOptional()
  birthDate?: Date;
}
