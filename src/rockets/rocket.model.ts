import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Rocket {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  stages?: number;
}
