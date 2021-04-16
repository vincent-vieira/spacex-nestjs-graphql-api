import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Mission } from '../missions/mission.model';
import { Rocket } from '../rockets/rocket.model';
import { Launchpad } from '../launchpads/launchpad.model';

@ObjectType()
export class Launch {
  @Field(() => ID)
  id: number;

  @Field({ name: 'site' })
  launchPad: Launchpad;

  @Field()
  cursor: number;

  @Field({ nullable: true })
  mission?: Mission;

  @Field()
  rocket: Rocket;
}

export type Launches = Array<Launch>;
