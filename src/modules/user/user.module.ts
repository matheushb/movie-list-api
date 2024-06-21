import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { Paginator } from 'src/common/utils/pagination';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, BcryptService, Paginator],
  exports: [UserService],
})
export class UserModule {}
