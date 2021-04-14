import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mission {
  @Field()
  name: string;

  @Field()
  missionPatchSmall: string;

  @Field()
  missionPatchLarge: string;
}
