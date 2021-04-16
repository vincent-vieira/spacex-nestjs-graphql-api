import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Launchpad {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  active?: boolean;
}
