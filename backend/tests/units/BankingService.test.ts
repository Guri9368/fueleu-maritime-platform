import { BankingService } from '../../src/core/application/services/BankingService';
import { ComplianceBalance } from '../../src/core/domain/valueObjects/ComplianceBalance';
import {
  NegativeBankingError,
  InsufficientBankBalanceError,
} from '../../src/core/domain/errors/DomainErrors';

describe('BankingService', () => {
  describe('validateBankOperation', () => {
    it('should not throw error for positive balance', () => {
      const cb = new ComplianceBalance(1000);
      expect(() => BankingService.validateBankOperation(cb)).not.toThrow();
    });

    it('should throw error for negative balance', () => {
      const cb = new ComplianceBalance(-500);
      expect(() => BankingService.validateBankOperation(cb)).toThrow(
        NegativeBankingError
      );
    });
  });

  describe('validateApplyOperation', () => {
    it('should not throw error when requested <= available', () => {
      expect(() =>
        BankingService.validateApplyOperation(1000, 500, 'SHIP001')
      ).not.toThrow();
    });

    it('should throw error when requested > available', () => {
      expect(() =>
        BankingService.validateApplyOperation(500, 1000, 'SHIP001')
      ).toThrow(InsufficientBankBalanceError);
    });
  });
});
