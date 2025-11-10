import { Pool, PoolMember } from '../../domain/models/Pool';

export interface PoolRepository {
  createPool(year: number): Promise<Pool>;
  addMember(member: Omit<PoolMember, 'id'>): Promise<PoolMember>;
  findPoolById(id: number): Promise<Pool | null>;
  findPoolMembers(poolId: number): Promise<PoolMember[]>;
}
