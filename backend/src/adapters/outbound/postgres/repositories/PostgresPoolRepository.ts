import { Pool as PgPool } from 'pg';
import { Pool, PoolMember } from '../../../../core/domain/models/Pool';
import { PoolRepository } from '../../../../core/ports/output/PoolRepository';
import { PoolMapper } from '../mappers/PoolMapper';

export class PostgresPoolRepository implements PoolRepository {
  constructor(private readonly pool: PgPool) {}

  async createPool(year: number): Promise<Pool> {
    const result = await this.pool.query(
      'INSERT INTO pools (year, created_at) VALUES ($1, NOW()) RETURNING *',
      [year]
    );
    return PoolMapper.toDomain(result.rows[0]);
  }

  async addMember(member: Omit<PoolMember, 'id'>): Promise<PoolMember> {
    const result = await this.pool.query(
      'INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after) VALUES ($1, $2, $3, $4) RETURNING *',
      [member.poolId, member.shipId, member.cbBefore, member.cbAfter]
    );
    return PoolMapper.memberToDomain(result.rows[0]);
  }

  async findPoolById(id: number): Promise<Pool | null> {
    const result = await this.pool.query('SELECT * FROM pools WHERE id = $1', [
      id,
    ]);
    return result.rows[0] ? PoolMapper.toDomain(result.rows[0]) : null;
  }

  async findPoolMembers(poolId: number): Promise<PoolMember[]> {
    const result = await this.pool.query(
      'SELECT * FROM pool_members WHERE pool_id = $1',
      [poolId]
    );
    return result.rows.map(PoolMapper.memberToDomain);
  }
}
