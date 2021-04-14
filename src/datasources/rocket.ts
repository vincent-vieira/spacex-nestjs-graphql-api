import { RESTDataSource } from 'apollo-datasource-rest';
import { Rocket } from '../rockets/rocket.model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../environment.module';

@Injectable()
export class RocketsAPI extends RESTDataSource {
  constructor(configService: ConfigService<Environment>) {
    super();
    this.baseURL = configService.get('SPACEX_URL');
    this.initialize({} as any);
  }

  async findOne(rocketId: string): Promise<Rocket> {
    const response = await this.get(`rockets/${rocketId}`);
    return this.convertToRocket(response);
  }

  private convertToRocket(response): Rocket {
    return {
      id: response.id,
      name: response.name,
      stages: response.stages,
    };
  }
}
