import { Route } from '../../../../core/domain/models/Route';

export class RouteMapper {
  static toDomain(row: any): Route {
    return {
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: row.year,
      ghgIntensity: parseFloat(row.ghg_intensity),
      fuelConsumption: parseFloat(row.fuel_consumption),
      distanceKm: parseFloat(row.distance_km),
      totalEmissions: parseFloat(row.total_emissions),
      isBaseline: row.is_baseline,
    };
  }
}
