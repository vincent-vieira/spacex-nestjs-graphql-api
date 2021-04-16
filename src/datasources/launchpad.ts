import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../environment.module';
import { Launchpad } from '../launchpads/launchpad.model';

@Injectable()
export class LaunchpadsAPI extends RESTDataSource {
  constructor(configService: ConfigService<Environment>) {
    super();
    this.baseURL = configService.get('SPACEX_URL');
    this.initialize({} as any);
  }

  async findOne(id: string): Promise<Launchpad> {
    const result = await this.get(`launchpads/${id}`);
    return this.convertToLaunchpad(result);
  }

  private convertToLaunchpad(result: any): Launchpad {
    return {
      id: result.id,
      name: result.full_name,
      active: result.status === 'active',
      description: result.details,
    };
  }
}
