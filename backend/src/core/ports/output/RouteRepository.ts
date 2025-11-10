import { Route, RouteCreateDTO } from '../../domain/models/Route';

export interface RouteRepository {
  findAll(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]>;
  findById(id: number): Promise<Route | null>;
  findByRouteId(routeId: string): Promise<Route | null>;
  findBaseline(): Promise<Route | null>;
  create(route: RouteCreateDTO): Promise<Route>;
  setBaseline(id: number, isBaseline: boolean): Promise<Route>;
  clearBaselines(): Promise<void>;
}
