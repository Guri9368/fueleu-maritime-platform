import { ShipCompliance } from '../../domain/models/Compliance';

export interface ComplianceRepository {
  findByShipAndYear(shipId: string, year: number): Promise<ShipCompliance | null>;
  save(data: {
    shipId: string;
    year: number;
    cbGco2eq: number;
  }): Promise<ShipCompliance>;
}
