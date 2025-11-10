import { PoolingService } from '../../src/core/application/services/PoolingService';
import { InvalidPoolError } from '../../src/core/domain/errors/DomainErrors';
import { PoolMemberInput } from '../../src/core/domain/models/Pool';

describe('PoolingService', () => {
  describe('validatePool', () => {
    it('should validate pool with positive total CB', () => {
      const members: PoolMemberInput[] = [
        { shipId: 'SHIP001', cbBefore: 1000 },
        { shipId: 'SHIP002', cbBefore: -300 },
      ];

      expect(() => PoolingService.validatePool(members)).not.toThrow();
    });

    it('should throw error for pool with negative total CB', () => {
      const members: PoolMemberInput[] = [
        { shipId: 'SHIP001', cbBefore: 500 },
        { shipId: 'SHIP002', cbBefore: -1000 },
      ];

      expect(() => PoolingService.validatePool(members)).toThrow(InvalidPoolError);
    });
  });

  describe('allocatePoolBalance', () => {
    it('should allocate surplus to deficits correctly', () => {
      const members: PoolMemberInput[] = [
        { shipId: 'SHIP001', cbBefore: 1000 },
        { shipId: 'SHIP002', cbBefore: -500 },
      ];

      const result = PoolingService.allocatePoolBalance(members);

      expect(result.length).toBe(2);
      expect(result.find((m) => m.shipId === 'SHIP002')?.cbAfter).toBeGreaterThanOrEqual(
        -500
      );
    });
  });
});
