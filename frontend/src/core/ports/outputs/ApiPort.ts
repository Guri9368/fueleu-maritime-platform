import { Route } from '../../domain/models/Route';
import { ComplianceBalance, AdjustedCB } from '../../domain/models/Compliance';
import { BankEntry } from '../../domain/models/Banking';
import { PoolResult, PoolMemberInput } from '../../domain/models/Pool';
import { RouteComparison } from '../../domain/types';

export interface ApiPort {
  getRoutes(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]>;

  setBaseline(routeId: string): Promise<Route>;

  compareRoutes(): Promise<RouteComparison>;

  getComplianceBalance(shipId: string, year: number): Promise<ComplianceBalance>;

  getAdjustedCB(shipId: string, year: number): Promise<AdjustedCB>;

  getBankRecords(shipId: string, year?: number): Promise<BankEntry[]>;

  bankSurplus(shipId: string, year: number, amount: number): Promise<BankEntry>;

  applyBanked(shipId: string, year: number, amount: number): Promise<BankEntry>;

  createPool(year: number, members: PoolMemberInput[]): Promise<PoolResult>;
}
