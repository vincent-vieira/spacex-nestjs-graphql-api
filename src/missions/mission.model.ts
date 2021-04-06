import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Mission {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  missionPatchSmall: string;

  @Field({ nullable: true })
  missionPatchLarge: string;
}
