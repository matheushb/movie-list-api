import { Module } from '@nestjs/common';
import { UserListService } from './user-list.service';
import { UserListController } from './user-list.controller';
import { UserListRepository } from './user-list.repository';

@Module({
  controllers: [UserListController],
  providers: [UserListService, UserListRepository],
})
export class UserListModule {}
