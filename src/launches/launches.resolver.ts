import { Injectable } from '@nestjs/common';
import { LaunchesAPI } from '../datasources/launch';
import { Query, Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Launch, Launches } from './launch.model';
import { Mission } from '../missions/mission.model';
import { RocketsAPI } from '../datasources/rocket';
import { Rocket } from '../rockets/rocket.model';

@Resolver(() => Launch)
@Injectable()
export class LaunchResolver {
  constructor(
    private readonly launchAPI: LaunchesAPI,
    private readonly rocketsAPI: RocketsAPI,
  ) {}

  @Query(() => [Launch], { name: 'launches' })
  async findAll(): Promise<Launches> {
    return this.launchAPI.findAll();
  }

  @Query(() => Launch, { name: 'launch' })
  async findOne(@Args('id') id: string) {
    return await this.launchAPI.findOne({ launchId: id });
  }

  @Query(() => [Launch], { name: 'launchesByIds' })
  async findSome(
    @Args({ name: 'ids', type: () => [String] }) launchIds: string[],
  ): Promise<Launches> {
    return this.launchAPI.findSome({ launchIds });
  }

  @ResolveField('mission', () => Mission)
  getMission(@Parent() { mission }: Launch) {
    // This is statically resolved, the mission's already constructed from the datasource
    return mission;
  }

  @ResolveField('rocket', () => Rocket)
  async getRocket(@Parent() { rocket: { id } }: Launch) {
    // This is dynamically resolved, the rocket's only know data is its id, and another query must be made in order to aggregate more data
    // Careful ! This can be very inefficient with large data sets
    return await this.rocketsAPI.findOne(id);
  }
}
