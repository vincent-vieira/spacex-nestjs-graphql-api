import { RESTDataSource } from "apollo-datasource-rest";
import { Rocket } from "../rockets/rocket.model";

export class RocketAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2';
    this.initialize({} as any);
  }

  async getRocket(rocketId: string): Promise<Rocket> {
    const response = await this.get(`rockets/${rocketId}`);
    return this.toRocket(response);
  }

  private toRocket(response): Rocket {
    return {
      id: response.id,
      name: response.name,
      stages: response.stages,
    };
  }
}
