import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Rocket {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Int, { nullable: false })
  stages: number;
}
