import { Request, Response, NextFunction } from 'express';
import { GetComplianceBalanceUseCase } from '../../../../core/application/useCases/compliance/GetComplianceBalanceUseCase';
import { GetAdjustedCBUseCase } from '../../../../core/application/useCases/compliance/GetAdjustedCBUseCase';

export class ComplianceController {
  constructor(
    private readonly getComplianceBalanceUseCase: GetComplianceBalanceUseCase,
    private readonly getAdjustedCBUseCase: GetAdjustedCBUseCase
  ) {}

  getComplianceBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const result = await this.getComplianceBalanceUseCase.execute(
        shipId as string,
        parseInt(year as string)
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getAdjustedCB = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const result = await this.getAdjustedCBUseCase.execute(
        shipId as string,
        parseInt(year as string)
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
