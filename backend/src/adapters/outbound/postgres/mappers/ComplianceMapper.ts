import { ShipCompliance } from '../../../../core/domain/models/Compliance';

export class ComplianceMapper {
  static toDomain(row: any): ShipCompliance {
    return {
      id: row.id,
      shipId: row.ship_id,
      year: row.year,
      cbGco2eq: parseFloat(row.cb_gco2eq),
    };
  }
}
