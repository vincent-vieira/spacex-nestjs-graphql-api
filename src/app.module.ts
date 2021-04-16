import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LaunchesModule } from './launches/launches.module';
import { Environment, EnvironmentModule } from './environment.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EnvironmentModule,
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService<Environment>) => {
        return {
          autoSchemaFile: true,
          sortSchema: true,
          playground: configService.get('IS_DEV'),
        };
      },
      inject: [ConfigService],
    }),
    LaunchesModule,
  ],
})
export class AppModule {}
