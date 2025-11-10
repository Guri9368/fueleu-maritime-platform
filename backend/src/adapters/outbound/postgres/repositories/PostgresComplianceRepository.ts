import { Pool as PgPool } from 'pg';
import { ShipCompliance } from '../../../../core/domain/models/Compliance';
import { ComplianceRepository } from '../../../../core/ports/output/ComplianceRepository';
import { ComplianceMapper } from '../mappers/ComplianceMapper';

export class PostgresComplianceRepository implements ComplianceRepository {
  constructor(private readonly pool: PgPool) {}

  async findByShipAndYear(
    shipId: string,
    year: number
  ): Promise<ShipCompliance | null> {
    const result = await this.pool.query(
      'SELECT * FROM ship_compliance WHERE ship_id = $1 AND year = $2',
      [shipId, year]
    );
    return result.rows[0] ? ComplianceMapper.toDomain(result.rows[0]) : null;
  }

  async save(data: {
    shipId: string;
    year: number;
    cbGco2eq: number;
  }): Promise<ShipCompliance> {
    const existing = await this.findByShipAndYear(data.shipId, data.year);

    if (existing) {
      const result = await this.pool.query(
        'UPDATE ship_compliance SET cb_gco2eq = $1 WHERE ship_id = $2 AND year = $3 RETURNING *',
        [data.cbGco2eq, data.shipId, data.year]
      );
      return ComplianceMapper.toDomain(result.rows[0]);
    }

    const result = await this.pool.query(
      'INSERT INTO ship_compliance (ship_id, year, cb_gco2eq) VALUES ($1, $2, $3) RETURNING *',
      [data.shipId, data.year, data.cbGco2eq]
    );
    return ComplianceMapper.toDomain(result.rows[0]);
  }
}
