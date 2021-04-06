import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Mission } from "../missions/mission.model";
import { Rocket } from "../rockets/rocket.model";

@ObjectType()
export class Launch {

  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  site: string;

  @Field({ nullable: true })
  cursor: string;

  @Field({ nullable: true })
  mission: Mission;

  @Field({ nullable: true })
  rocket: Rocket;
}

export type Launches = Array<Launch>;
