import { Module } from '@nestjs/common';
import { RocketsAPI } from '../datasources/rocket';

@Module({
  providers: [RocketsAPI],
  exports: [RocketsAPI],
})
export class RocketsModule {}
