import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';
import { Paginator } from 'src/common/utils/pagination';

@Module({
  controllers: [ListController],
  providers: [ListService, ListRepository, Paginator],
})
export class ListModule {}
