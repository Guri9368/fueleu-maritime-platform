import { BankEntry, BankingOperation } from '../../domain/models/BankEntry';

export interface BankingRepository {
  findByShip(shipId: string): Promise<BankEntry[]>;
  findByShipAndYear(shipId: string, year: number): Promise<BankEntry[]>;
  save(operation: BankingOperation): Promise<BankEntry>;
}

