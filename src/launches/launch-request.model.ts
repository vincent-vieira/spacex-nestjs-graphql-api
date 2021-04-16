import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class LaunchRequestModel {
  @Field(() => ID)
  missionId: string;

  // We can't use the name attribute of the @Field decorator yet : https://github.com/nestjs/graphql/issues/1096
  @Field(() => ID)
  launchPadId: string;

  @Field(() => ID)
  rocketId: string;
}
