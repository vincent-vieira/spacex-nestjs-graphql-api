import { Module } from '@nestjs/common';
import { LaunchAPI as LaunchesAPI } from '../datasources/launch';
import { LaunchResolver } from './launches.resolver';
import { RocketsModule } from '../rockets/rockets.module';

@Module({
  imports: [RocketsModule],
  providers: [LaunchResolver, LaunchesAPI],
})
export class LaunchesModule {}
