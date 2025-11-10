import { BankingRepository } from '../../../ports/output/BankingRepository';
import { ComplianceRepository } from '../../../ports/output/ComplianceRepository';
import { BankingService } from '../../services/BankingService';
import { ComplianceBalance } from '../../../domain/valueObjects/ComplianceBalance';
import { BankEntry } from '../../../domain/models/BankEntry';

export class BankSurplusUseCase {
  constructor(
    private readonly bankingRepository: BankingRepository,
    private readonly complianceRepository: ComplianceRepository
  ) {}

  async execute(shipId: string, year: number, amount: number): Promise<BankEntry> {
    const compliance = await this.complianceRepository.findByShipAndYear(
      shipId,
      year
    );

    if (!compliance) {
      throw new Error(
        `No compliance data found for ship ${shipId} in year ${year}`
      );
    }

    const cb = new ComplianceBalance(compliance.cbGco2eq);
    BankingService.validateBankOperation(cb);

    if (amount > compliance.cbGco2eq) {
      throw new Error(
        `Cannot bank ${amount} - only ${compliance.cbGco2eq} available`
      );
    }

    return await this.bankingRepository.save({
      shipId,
      year,
      amount,
    });
  }
}
