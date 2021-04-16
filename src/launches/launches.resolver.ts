import { Injectable } from '@nestjs/common';
import { LaunchesAPI } from '../datasources/launch';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Launch, Launches } from './launch.model';
import { Mission } from '../missions/mission.model';
import { RocketsAPI } from '../datasources/rocket';
import { Rocket } from '../rockets/rocket.model';
import { LaunchRequestModel } from './launch-request.model';
import { LaunchpadsAPI } from '../datasources/launchpad';

@Resolver(() => Launch)
@Injectable()
export class LaunchResolver {
  constructor(
    private readonly launchAPI: LaunchesAPI,
    private readonly rocketsAPI: RocketsAPI,
    private readonly launchpadsAPI: LaunchpadsAPI,
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
    return await this.launchAPI.findSome({ launchIds });
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

  @Mutation(() => Launch)
  async launch(
    @Args('launchRequest') model: LaunchRequestModel,
  ): Promise<Launch> {
    // The R-SpaceX API doesn't expose a "mission" endpoint on v2.
    const { launchPadId, rocketId } = model;
    const launchPad = await this.launchpadsAPI.findOne(launchPadId);
    const rocket = await this.rocketsAPI.findOne(rocketId);

    // Here, you can persist your object using whatever you want.
    // Ideally, this should be done outside the resolver, we're constructing the
    // result object right inside this method for the sake of demonstration

    return {
      id: 502,
      rocket,
      launchPad,
      cursor: Date.now(),
    };
  }
}
