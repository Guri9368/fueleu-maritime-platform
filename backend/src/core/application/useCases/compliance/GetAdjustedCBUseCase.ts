import { ComplianceRepository } from '../../../ports/output/ComplianceRepository';
import { BankingRepository } from '../../../ports/output/BankingRepository';

export class GetAdjustedCBUseCase {
  constructor(
    private readonly complianceRepository: ComplianceRepository,
    private readonly bankingRepository: BankingRepository
  ) {}

  async execute(
    shipId: string,
    year: number
  ): Promise<{ adjustedCb: number; originalCb: number; bankedAmount: number }> {
    const compliance = await this.complianceRepository.findByShipAndYear(
      shipId,
      year
    );

    if (!compliance) {
      throw new Error(
        `No compliance data found for ship ${shipId} in year ${year}`
      );
    }

    const bankRecords = await this.bankingRepository.findByShipAndYear(
      shipId,
      year
    );

    const totalBanked = bankRecords.reduce(
      (sum, record) => sum + record.amountGco2eq,
      0
    );

    return {
      originalCb: compliance.cbGco2eq,
      bankedAmount: totalBanked,
      adjustedCb: compliance.cbGco2eq + totalBanked,
    };
  }
}
