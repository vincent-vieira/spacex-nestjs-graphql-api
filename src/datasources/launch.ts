import { RESTDataSource } from 'apollo-datasource-rest';
import { Launch, Launches } from '../launches/launch.model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../environment.module';

@Injectable()
export class LaunchesAPI extends RESTDataSource {
  constructor(configService: ConfigService<Environment>) {
    super();
    this.baseURL = configService.get('SPACEX_URL');
    this.initialize({} as any);
  }

  async findAll(): Promise<Launches> {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map((response) => this.convertToLauncher(response))
      : [];
  }

  async findOne({ launchId }): Promise<Launch> {
    const response = await this.get('launches', { flight_number: launchId });
    return this.convertToLauncher(response[0]);
  }

  async findSome({ launchIds }): Promise<Launches> {
    return Promise.all(launchIds.map((launchId) => this.findOne({ launchId })));
  }

  private convertToLauncher(launch): Launch {
    return {
      id: launch.flight_number || 0,
      cursor: launch.launch_date_unix,
      launchPad: {
        id: launch?.launch_site?.site_id,
      },
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
      },
    };
  }
}
