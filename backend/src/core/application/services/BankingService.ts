import {
  InsufficientBankBalanceError,
  NegativeBankingError,
} from '../../domain/errors/DomainErrors';
import { ComplianceBalance } from '../../domain/valueObjects/ComplianceBalance';

export class BankingService {
  static validateBankOperation(cb: ComplianceBalance): void {
    if (cb.isDeficit()) {
      throw new NegativeBankingError('Cannot bank negative balance');
    }
  }

  static validateApplyOperation(
    available: number,
    requested: number,
    shipId: string
  ): void {
    if (requested > available) {
      throw new InsufficientBankBalanceError(shipId, available, requested);
    }
  }

  static calculateNewBalance(
    currentBalance: number,
    operation: number
  ): number {
    return currentBalance + operation;
  }
}
