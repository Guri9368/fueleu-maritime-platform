import { ComplianceBalance } from '../../domain/valueObjects/ComplianceBalance';
import { Route } from '../../domain/models/Route';

export class ComplianceCalculator {
  private static readonly TARGET_INTENSITY = 89.3368; // gCO₂e/MJ
  private static readonly LCV_MJ_PER_TON = 41000; // MJ per ton of fuel

  static computeComplianceBalance(
    actualIntensity: number,
    fuelConsumption: number
  ): ComplianceBalance {
    const energyMJ = fuelConsumption * this.LCV_MJ_PER_TON;
    const cbValue = (this.TARGET_INTENSITY - actualIntensity) * energyMJ;
    return new ComplianceBalance(cbValue);
  }

  static compareRoutes(
    baselineRoute: Route,
    comparisonRoute: Route
  ): {
    baselineIntensity: number;
    comparisonIntensity: number;
    percentDiff: number;
    compliant: boolean;
  } {
    const baselineIntensity = baselineRoute.ghgIntensity;
    const comparisonIntensity = comparisonRoute.ghgIntensity;
    const percentDiff =
      ((comparisonIntensity / baselineIntensity) - 1) * 100;
    const compliant = comparisonIntensity <= this.TARGET_INTENSITY;

    return {
      baselineIntensity,
      comparisonIntensity,
      percentDiff,
      compliant,
    };
  }

  static getTargetIntensity(): number {
    return this.TARGET_INTENSITY;
  }

  static calculateEnergyMJ(fuelConsumption: number): number {
    return fuelConsumption * this.LCV_MJ_PER_TON;
  }
}
