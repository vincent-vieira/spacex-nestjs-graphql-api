import { Module } from '@nestjs/common';
import { LaunchesAPI } from '../datasources/launch';
import { LaunchResolver } from './launches.resolver';
import { RocketsModule } from '../rockets/rockets.module';
import { LaunchpadsModule } from '../launchpads/launchpads.module';

@Module({
  imports: [RocketsModule, LaunchpadsModule],
  providers: [LaunchResolver, LaunchesAPI],
})
export class LaunchesModule {}
