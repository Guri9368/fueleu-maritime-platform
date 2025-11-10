import { Route } from '../../../domain/models/Route';
import { RouteRepository } from '../../../ports/output/RouteRepository';

export class GetRoutesUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]> {
    return await this.routeRepository.findAll(filters);
  }
}
