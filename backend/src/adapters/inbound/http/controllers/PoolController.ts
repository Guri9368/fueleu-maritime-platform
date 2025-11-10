import { Request, Response, NextFunction } from 'express';
import { CreatePoolUseCase } from '../../../../core/application/useCases/pooling/CreatePoolUseCase';

export class PoolController {
  constructor(private readonly createPoolUseCase: CreatePoolUseCase) {}

  createPool = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { year, members } = req.body;

      if (!year || !members || !Array.isArray(members)) {
        res.status(400).json({ error: 'year and members array are required' });
        return;
      }

      const result = await this.createPoolUseCase.execute({ year, members });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
