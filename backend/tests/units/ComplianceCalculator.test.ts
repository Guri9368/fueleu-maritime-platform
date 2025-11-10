import { ComplianceCalculator } from '../../src/core/application/services/ComplianceCalculator';
import { Route } from '../../src/core/domain/models/Route';

describe('ComplianceCalculator', () => {
  describe('computeComplianceBalance', () => {
    it('should calculate positive compliance balance when actual < target', () => {
      const cb = ComplianceCalculator.computeComplianceBalance(88.0, 5000);
      expect(cb.getValue()).toBeGreaterThan(0);
      expect(cb.isSurplus()).toBe(true);
    });

    it('should calculate negative compliance balance when actual > target', () => {
      const cb = ComplianceCalculator.computeComplianceBalance(95.0, 5000);
      expect(cb.getValue()).toBeLessThan(0);
      expect(cb.isDeficit()).toBe(true);
    });
  });

  describe('compareRoutes', () => {
    it('should compare baseline and comparison routes correctly', () => {
      const baseline: Route = {
        id: 1,
        routeId: 'R001',
        vesselType: 'Container',
        fuelType: 'HFO',
        year: 2024,
        ghgIntensity: 91.0,
        fuelConsumption: 5000,
        distanceKm: 12000,
        totalEmissions: 4500,
        isBaseline: true,
      };

      const comparison: Route = {
        ...baseline,
        id: 2,
        routeId: 'R002',
        ghgIntensity: 88.0,
        isBaseline: false,
      };

      const result = ComplianceCalculator.compareRoutes(baseline, comparison);

      expect(result.baselineIntensity).toBe(91.0);
      expect(result.comparisonIntensity).toBe(88.0);
      expect(result.percentDiff).toBeCloseTo(-3.297, 2);
      expect(result.compliant).toBe(true);
    });
  });
});
