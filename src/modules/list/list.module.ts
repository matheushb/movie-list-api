import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';

@Module({
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
