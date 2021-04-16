import { Module } from '@nestjs/common';
import { LaunchpadsAPI } from '../datasources/launchpad';

@Module({
  providers: [LaunchpadsAPI],
  exports: [LaunchpadsAPI],
})
export class LaunchpadsModule {}
