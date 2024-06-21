import { Module } from '@nestjs/common';
import { MovieDbGateway } from './moviedb.gateway';

@Module({ providers: [MovieDbGateway], exports: [MovieDbGateway] })
export class MovieDbGatewayModule {}
