import { Paginator } from '@/common/utils/pagination';
import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';
import { ListService } from './list.service';

@Module({
  controllers: [ListController],
  providers: [ListService, ListRepository, Paginator],
})
export class ListModule {}
