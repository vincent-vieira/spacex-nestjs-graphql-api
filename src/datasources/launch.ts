import { RESTDataSource } from 'apollo-datasource-rest';
import { Launch, Launches } from '../launches/launch.model';

export class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
    this.initialize({} as any);
  }

  async getAllLaunches(): Promise<Launches> {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map((response) => this.toLauncher(response))
      : [];
  }

  async getLaunchById({ launchId }): Promise<Launch> {
    const response = await this.get('launches', { flight_number: launchId });
    return this.toLauncher(response[0]);
  }

  async getLaunchesByIds({ launchIds }): Promise<Launches> {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById({ launchId })),
    );
  }

  private toLauncher(launch): Launch {
    const result = {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        stages: 0,
      },
    };
    console.log(launch);

    return result;
  }
}
