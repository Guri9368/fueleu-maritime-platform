import { BankEntry } from '../../../domain/models/BankEntry';
import { BankingRepository } from '../../../ports/output/BankingRepository';

export class GetBankRecordsUseCase {
  constructor(private readonly bankingRepository: BankingRepository) {}

  async execute(shipId: string, year?: number): Promise<BankEntry[]> {
    if (year) {
      return await this.bankingRepository.findByShipAndYear(shipId, year);
    }
    return await this.bankingRepository.findByShip(shipId);
  }
}
