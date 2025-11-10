import { ComplianceRepository } from '../../../ports/output/ComplianceRepository';
import { RouteRepository } from '../../../ports/output/RouteRepository';
import { ComplianceCalculator } from '../../services/ComplianceCalculator';
import { ComplianceResult } from '../../../domain/models/Compliance';

export class GetComplianceBalanceUseCase {
  constructor(
    private readonly complianceRepository: ComplianceRepository,
    private readonly routeRepository: RouteRepository
  ) {}

  async execute(shipId: string, year: number): Promise<ComplianceResult> {
    const routes = await this.routeRepository.findAll({
      year,
    });

    if (routes.length === 0) {
      throw new Error(`No route data found for year ${year}`);
    }

    const route = routes[0];
    const actualIntensity = route.ghgIntensity;
    const fuelConsumption = route.fuelConsumption;

    const cb = ComplianceCalculator.computeComplianceBalance(
      actualIntensity,
      fuelConsumption
    );

    const energyMJ = ComplianceCalculator.calculateEnergyMJ(fuelConsumption);

    await this.complianceRepository.save({
      shipId,
      year,
      cbGco2eq: cb.getValue(),
    });

    return {
      shipId,
      year,
      actualIntensity,
      targetIntensity: ComplianceCalculator.getTargetIntensity(),
      energyMJ,
      complianceBalance: cb.getValue(),
    };
  }
}
