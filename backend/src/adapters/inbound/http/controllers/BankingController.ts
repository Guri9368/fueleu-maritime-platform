import { Request, Response, NextFunction } from 'express';
import { GetBankRecordsUseCase } from '../../../../core/application/useCases/banking/GetBankRecordsUseCase';
import { BankSurplusUseCase } from '../../../../core/application/useCases/banking/BankSurplusUseCase';
import { ApplyBankedUseCase } from '../../../../core/application/useCases/banking/ApplyBankedUseCase';

export class BankingController {
  constructor(
    private readonly getBankRecordsUseCase: GetBankRecordsUseCase,
    private readonly bankSurplusUseCase: BankSurplusUseCase,
    private readonly applyBankedUseCase: ApplyBankedUseCase
  ) {}

  getBankRecords = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { shipId, year } = req.query;

      if (!shipId) {
        res.status(400).json({ error: 'shipId is required' });
        return;
      }

      const records = await this.getBankRecordsUseCase.execute(
        shipId as string,
        year ? parseInt(year as string) : undefined
      );
      res.json(records);
    } catch (error) {
      next(error);
    }
  };

  bankSurplus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { shipId, year, amount } = req.body;

      if (!shipId || !year || amount === undefined) {
        res.status(400).json({ error: 'shipId, year, and amount are required' });
        return;
      }

      const result = await this.bankSurplusUseCase.execute(
        shipId,
        year,
        amount
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  applyBanked = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { shipId, year, amount } = req.body;

      if (!shipId || !year || amount === undefined) {
        res.status(400).json({ error: 'shipId, year, and amount are required' });
        return;
      }

      const result = await this.applyBankedUseCase.execute(
        shipId,
        year,
        amount
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
