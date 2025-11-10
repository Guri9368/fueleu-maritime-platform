import { Request, Response, NextFunction } from 'express';
import { GetRoutesUseCase } from '../../../../core/application/useCases/routes/GetRoutesUseCase';
import { SetBaselineUseCase } from '../../../../core/application/useCases/routes/SetBaselineUseCase';
import { CompareRoutesUseCase } from '../../../../core/application/useCases/routes/CompareRoutesUseCase';

export class RouteController {
  constructor(
    private readonly getRoutesUseCase: GetRoutesUseCase,
    private readonly setBaselineUseCase: SetBaselineUseCase,
    private readonly compareRoutesUseCase: CompareRoutesUseCase
  ) {}

  getRoutes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { vesselType, fuelType, year } = req.query;

      const filters: any = {};
      if (vesselType) filters.vesselType = vesselType as string;
      if (fuelType) filters.fuelType = fuelType as string;
      if (year) filters.year = parseInt(year as string);

      const routes = await this.getRoutesUseCase.execute(filters);
      res.json(routes);
    } catch (error) {
      next(error);
    }
  };

  setBaseline = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const route = await this.setBaselineUseCase.execute(id);
      res.json(route);
    } catch (error) {
      next(error);
    }
  };

  compareRoutes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const comparison = await this.compareRoutesUseCase.execute();
      res.json(comparison);
    } catch (error) {
      next(error);
    }
  };
}
