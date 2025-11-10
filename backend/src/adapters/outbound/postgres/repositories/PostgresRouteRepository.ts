import { Pool as PgPool } from 'pg';
import { Route, RouteCreateDTO } from '../../../../core/domain/models/Route';
import { RouteRepository } from '../../../../core/ports/output/RouteRepository';
import { RouteMapper } from '../mappers/RouteMapper';

export class PostgresRouteRepository implements RouteRepository {
  constructor(private readonly pool: PgPool) {}

  async findAll(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]> {
    let query = 'SELECT * FROM routes WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.vesselType) {
      query += ` AND vessel_type = $${paramIndex}`;
      params.push(filters.vesselType);
      paramIndex++;
    }

    if (filters?.fuelType) {
      query += ` AND fuel_type = $${paramIndex}`;
      params.push(filters.fuelType);
      paramIndex++;
    }

    if (filters?.year) {
      query += ` AND year = $${paramIndex}`;
      params.push(filters.year);
      paramIndex++;
    }

    query += ' ORDER BY id';

    const result = await this.pool.query(query, params);
    return result.rows.map(RouteMapper.toDomain);
  }

  async findById(id: number): Promise<Route | null> {
    const result = await this.pool.query('SELECT * FROM routes WHERE id = $1', [
      id,
    ]);
    return result.rows[0] ? RouteMapper.toDomain(result.rows[0]) : null;
  }

  async findByRouteId(routeId: string): Promise<Route | null> {
    const result = await this.pool.query(
      'SELECT * FROM routes WHERE route_id = $1',
      [routeId]
    );
    return result.rows[0] ? RouteMapper.toDomain(result.rows[0]) : null;
  }

  async findBaseline(): Promise<Route | null> {
    const result = await this.pool.query(
      'SELECT * FROM routes WHERE is_baseline = true LIMIT 1'
    );
    return result.rows[0] ? RouteMapper.toDomain(result.rows[0]) : null;
  }

  async create(route: RouteCreateDTO): Promise<Route> {
    const result = await this.pool.query(
      `INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, 
       fuel_consumption, distance_km, total_emissions, is_baseline)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
       RETURNING *`,
      [
        route.routeId,
        route.vesselType,
        route.fuelType,
        route.year,
        route.ghgIntensity,
        route.fuelConsumption,
        route.distanceKm,
        route.totalEmissions,
      ]
    );
    return RouteMapper.toDomain(result.rows[0]);
  }

  async setBaseline(id: number, isBaseline: boolean): Promise<Route> {
    const result = await this.pool.query(
      'UPDATE routes SET is_baseline = $1 WHERE id = $2 RETURNING *',
      [isBaseline, id]
    );
    return RouteMapper.toDomain(result.rows[0]);
  }

  async clearBaselines(): Promise<void> {
    await this.pool.query('UPDATE routes SET is_baseline = false');
  }
}

