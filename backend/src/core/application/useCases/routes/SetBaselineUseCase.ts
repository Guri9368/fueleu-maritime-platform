import { Route } from '../../../domain/models/Route';
import { RouteRepository } from '../../../ports/output/RouteRepository';
import { NotFoundError } from '../../../domain/errors/DomainErrors';

export class SetBaselineUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(routeId: string): Promise<Route> {
    const route = await this.routeRepository.findByRouteId(routeId);

    if (!route) {
      throw new NotFoundError(`Route with ID ${routeId} not found`);
    }

    await this.routeRepository.clearBaselines();
    return await this.routeRepository.setBaseline(route.id, true);
  }
}
