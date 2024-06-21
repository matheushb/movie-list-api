import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserSinginDto {
  @IsEmail()
  @ApiProperty({ example: 'matheushbaraldi@gmail.com' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'matheus123' })
  password: string;
}
