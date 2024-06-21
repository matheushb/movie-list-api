import { Module } from '@nestjs/common';
import { UserListService } from './user-list.service';
import { UserListController } from './user-list.controller';
import { UserListRepository } from './user-list.repository';
import { Paginator } from 'src/common/utils/pagination';

@Module({
  controllers: [UserListController],
  providers: [UserListService, UserListRepository, Paginator],
})
export class UserListModule {}
