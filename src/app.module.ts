import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LaunchesModule } from './launches/launches.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
    LaunchesModule,
  ],
})
export class AppModule {}
