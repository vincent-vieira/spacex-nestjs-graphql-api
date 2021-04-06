import { Injectable } from '@nestjs/common';
import { LaunchAPI } from '../datasources/launch';
import { Query, Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Launch, Launches } from './launch.model';
import { Mission } from '../missions/mission.model';
import { RocketAPI } from '../datasources/rocket';
import { Rocket } from '../rockets/rocket.model';

@Resolver(() => Launch)
@Injectable()
export class LaunchResolver {
  constructor(
    private readonly launchAPI: LaunchAPI,
    private readonly rocketsAPI: RocketAPI,
  ) {}

  @Query(() => [Launch], { name: 'launches' })
  async getLaunches(): Promise<Launches> {
    return this.launchAPI.getAllLaunches();
  }

  @Query(() => Launch, { name: 'launch' })
  async getLaunch(@Args('id') id: string) {
    return await this.launchAPI.getLaunchById({ launchId: id });
  }

  @Query(() => [Launch], { name: 'launchesByIds' })
  async getLaunchesByIds(
    @Args({ name: 'ids', type: () => [String] }) launchIds: string[],
  ): Promise<Launches> {
    return this.launchAPI.getLaunchesByIds({ launchIds });
  }

  @ResolveField('mission', () => Mission)
  getMission(@Parent() { mission }: Launch) {
    return mission;
  }

  @ResolveField('rocket', () => Rocket)
  getRocket(@Parent() { rocket }: Launch) {
    return rocket;
    //return await this.rocketsAPI.getRocket(`${id}`);
  }
}
