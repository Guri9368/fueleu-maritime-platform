import { PoolRepository } from '../../../ports/output/PoolRepository';
import { PoolingService } from '../../services/PoolingService';
import { PoolCreationRequest, PoolResult } from '../../../domain/models/Pool';

export class CreatePoolUseCase {
  constructor(private readonly poolRepository: PoolRepository) {}

  async execute(request: PoolCreationRequest): Promise<PoolResult> {
    PoolingService.validatePool(request.members);

    const allocatedMembers = PoolingService.allocatePoolBalance(request.members);

    PoolingService.validatePoolResult(allocatedMembers);

    const pool = await this.poolRepository.createPool(request.year);

    const savedMembers = await Promise.all(
      allocatedMembers.map((member) =>
        this.poolRepository.addMember({
          poolId: pool.id,
          shipId: member.shipId,
          cbBefore: member.cbBefore,
          cbAfter: member.cbAfter,
        })
      )
    );

    const totalCbBefore = savedMembers.reduce(
      (sum, m) => sum + m.cbBefore,
      0
    );
    const totalCbAfter = savedMembers.reduce((sum, m) => sum + m.cbAfter, 0);

    return {
      poolId: pool.id,
      year: pool.year,
      members: savedMembers,
      isValid: totalCbAfter >= 0,
      totalCbBefore,
      totalCbAfter,
    };
  }
}
