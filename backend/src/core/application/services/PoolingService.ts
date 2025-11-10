import { InvalidPoolError } from '../../domain/errors/DomainErrors';
import { PoolMemberInput, PoolMember } from '../../domain/models/Pool';

export class PoolingService {
  static validatePool(members: PoolMemberInput[]): void {
    const totalCb = members.reduce((sum, m) => sum + m.cbBefore, 0);

    if (totalCb < 0) {
      throw new InvalidPoolError(
        `Pool total compliance balance is negative: ${totalCb}`
      );
    }

    members.forEach((member) => {
      if (member.cbBefore < 0) {
        const canExitWorse = this.canDeficitExitWorse(member, members);
        if (!canExitWorse) {
          throw new InvalidPoolError(
            `Deficit ship ${member.shipId} would exit worse than entry`
          );
        }
      }
    });
  }

  private static canDeficitExitWorse(
    deficit: PoolMemberInput,
    members: PoolMemberInput[]
  ): boolean {
    return true;
  }

  static allocatePoolBalance(
    members: PoolMemberInput[]
  ): Omit<PoolMember, 'id' | 'poolId'>[] {
    const sorted = [...members].sort((a, b) => b.cbBefore - a.cbBefore);

    const result: Omit<PoolMember, 'id' | 'poolId'>[] = sorted.map((m) => ({
      shipId: m.shipId,
      cbBefore: m.cbBefore,
      cbAfter: m.cbBefore,
    }));

    const surpluses = result.filter((m) => m.cbBefore > 0);
    const deficits = result.filter((m) => m.cbBefore < 0);

    for (const surplus of surpluses) {
      let availableSurplus = surplus.cbBefore;

      for (const deficit of deficits) {
        if (availableSurplus <= 0) break;
        if (deficit.cbAfter >= 0) continue;

        const needed = Math.abs(deficit.cbAfter);
        const toTransfer = Math.min(needed, availableSurplus);

        deficit.cbAfter += toTransfer;
        surplus.cbAfter -= toTransfer;
        availableSurplus -= toTransfer;
      }
    }

    return result;
  }

  static validatePoolResult(
    membersAfter: Omit<PoolMember, 'id' | 'poolId'>[]
  ): void {
    const totalAfter = membersAfter.reduce((sum, m) => sum + m.cbAfter, 0);

    if (totalAfter < 0) {
      throw new InvalidPoolError(
        `Pool allocation resulted in negative total: ${totalAfter}`
      );
    }

    membersAfter.forEach((member) => {
      if (member.cbBefore < 0 && member.cbAfter < member.cbBefore) {
        throw new InvalidPoolError(
          `Deficit ship ${member.shipId} exited worse than entry`
        );
      }

      if (member.cbBefore > 0 && member.cbAfter < 0) {
        throw new InvalidPoolError(
          `Surplus ship ${member.shipId} cannot exit with deficit`
        );
      }
    });
  }
}
