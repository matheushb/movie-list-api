import { Paginator } from '@/common/utils/pagination';
import { Module } from '@nestjs/common';
import { UserListController } from './user-list.controller';
import { UserListRepository } from './user-list.repository';
import { UserListService } from './user-list.service';

@Module({
  controllers: [UserListController],
  providers: [UserListService, UserListRepository, Paginator],
})
export class UserListModule {}
