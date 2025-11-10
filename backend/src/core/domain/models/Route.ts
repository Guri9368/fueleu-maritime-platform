export interface Route {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distanceKm: number;
  totalEmissions: number;
  isBaseline: boolean;
}

export interface RouteCreateDTO {
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distanceKm: number;
  totalEmissions: number;
}
