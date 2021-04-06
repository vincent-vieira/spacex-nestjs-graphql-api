import { Module } from '@nestjs/common';
import { RocketAPI } from '../datasources/rocket';

@Module({
  providers: [RocketAPI],
  exports: [RocketAPI],
})
export class RocketsModule {}
