import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LaunchesModule } from './launches/launches.module';
import { EnvironmentModule } from './environment.module';

@Module({
  imports: [
    EnvironmentModule,
    // TODO : the api is read-only. Maybe add some mutations/persistence sometime ?
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
    LaunchesModule,
  ],
})
export class AppModule {}
