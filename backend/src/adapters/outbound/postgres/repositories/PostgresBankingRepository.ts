import { Pool as PgPool } from 'pg';
import { BankEntry, BankingOperation } from '../../../../core/domain/models/BankEntry';
import { BankingRepository } from '../../../../core/ports/output/BankingRepository';
import { BankingMapper } from '../mappers/BankingMapper';

export class PostgresBankingRepository implements BankingRepository {
  constructor(private readonly pool: PgPool) {}

  async findByShip(shipId: string): Promise<BankEntry[]> {
    const result = await this.pool.query(
      'SELECT * FROM bank_entries WHERE ship_id = $1 ORDER BY year',
      [shipId]
    );
    return result.rows.map(BankingMapper.toDomain);
  }

  async findByShipAndYear(shipId: string, year: number): Promise<BankEntry[]> {
    const result = await this.pool.query(
      'SELECT * FROM bank_entries WHERE ship_id = $1 AND year = $2',
      [shipId, year]
    );
    return result.rows.map(BankingMapper.toDomain);
  }

  async save(operation: BankingOperation): Promise<BankEntry> {
    const result = await this.pool.query(
      'INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1, $2, $3) RETURNING *',
      [operation.shipId, operation.year, operation.amount]
    );
    return BankingMapper.toDomain(result.rows[0]);
  }
}
