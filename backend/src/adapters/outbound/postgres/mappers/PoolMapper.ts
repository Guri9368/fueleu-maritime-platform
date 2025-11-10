import { Pool, PoolMember } from '../../../../core/domain/models/Pool';

export class PoolMapper {
  static toDomain(row: any): Pool {
    return {
      id: row.id,
      year: row.year,
      createdAt: new Date(row.created_at),
    };
  }

  static memberToDomain(row: any): PoolMember {
    return {
      id: row.id,
      poolId: row.pool_id,
      shipId: row.ship_id,
      cbBefore: parseFloat(row.cb_before),
      cbAfter: parseFloat(row.cb_after),
    };
  }
}
