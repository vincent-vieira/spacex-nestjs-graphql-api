import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Mission } from '../missions/mission.model';
import { Rocket } from '../rockets/rocket.model';

@ObjectType()
export class Launch {
  @Field(() => ID)
  id: number;

  @Field()
  site: string;

  @Field()
  cursor: string;

  @Field()
  mission: Mission;

  @Field({ nullable: true })
  rocket?: Rocket;
}

export type Launches = Array<Launch>;
