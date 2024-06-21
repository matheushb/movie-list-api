import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @Get()
  async seed() {
    return this.seedService.seed();
  }
}
