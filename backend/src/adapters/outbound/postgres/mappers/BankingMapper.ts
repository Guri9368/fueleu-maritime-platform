import { BankEntry } from '../../../../core/domain/models/BankEntry';

export class BankingMapper {
  static toDomain(row: any): BankEntry {
    return {
      id: row.id,
      shipId: row.ship_id,
      year: row.year,
      amountGco2eq: parseFloat(row.amount_gco2eq),
    };
  }
}
