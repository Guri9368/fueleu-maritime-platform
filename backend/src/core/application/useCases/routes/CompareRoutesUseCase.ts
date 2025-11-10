import { Route } from '../../../domain/models/Route';
import { RouteRepository } from '../../../ports/output/RouteRepository';
import { ComplianceCalculator } from '../../services/ComplianceCalculator';
import { NotFoundError } from '../../../domain/errors/DomainErrors';

export interface RouteComparison {
  baseline: Route;
  comparisons: Array<{
    route: Route;
    baselineIntensity: number;
    comparisonIntensity: number;
    percentDiff: number;
    compliant: boolean;
  }>;
  targetIntensity: number;
}

export class CompareRoutesUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(): Promise<RouteComparison> {
    const baseline = await this.routeRepository.findBaseline();

    if (!baseline) {
      throw new NotFoundError('No baseline route set');
    }

    const allRoutes = await this.routeRepository.findAll();
    const nonBaselineRoutes = allRoutes.filter((r) => !r.isBaseline);

    const comparisons = nonBaselineRoutes.map((route) => ({
      route,
      ...ComplianceCalculator.compareRoutes(baseline, route),
    }));

    return {
      baseline,
      comparisons,
      targetIntensity: ComplianceCalculator.getTargetIntensity(),
    };
  }
}
