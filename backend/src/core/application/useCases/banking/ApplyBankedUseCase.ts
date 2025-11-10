import { BankingRepository } from '../../../ports/output/BankingRepository';
import { BankingService } from '../../services/BankingService';
import { BankEntry } from '../../../domain/models/BankEntry';

export class ApplyBankedUseCase {
  constructor(private readonly bankingRepository: BankingRepository) {}

  async execute(shipId: string, year: number, amount: number): Promise<BankEntry> {
    const existingRecords = await this.bankingRepository.findByShip(shipId);
    const totalBanked = existingRecords.reduce(
      (sum, record) => sum + record.amountGco2eq,
      0
    );

    BankingService.validateApplyOperation(totalBanked, amount, shipId);

    return await this.bankingRepository.save({
      shipId,
      year,
      amount: -amount,
    });
  }
}
