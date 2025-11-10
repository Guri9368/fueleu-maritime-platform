import { Router } from 'express';
import { Pool } from 'pg';
import { RouteController } from '../controllers/RouteController';
import { ComplianceController } from '../controllers/ComplianceController';
import { BankingController } from '../controllers/BankingController';
import { PoolController } from '../controllers/PoolController';

import { PostgresRouteRepository } from '../../../outbound/postgres/repositories/PostgresRouteRepository';
import { PostgresComplianceRepository } from '../../../outbound/postgres/repositories/PostgresComplianceRepository';
import { PostgresBankingRepository } from '../../../outbound/postgres/repositories/PostgresBankingRepository';
import { PostgresPoolRepository } from '../../../outbound/postgres/repositories/PostgresPoolRepository';

import { GetRoutesUseCase } from '../../../../core/application/useCases/routes/GetRoutesUseCase';
import { SetBaselineUseCase } from '../../../../core/application/useCases/routes/SetBaselineUseCase';
import { CompareRoutesUseCase } from '../../../../core/application/useCases/routes/CompareRoutesUseCase';
import { GetComplianceBalanceUseCase } from '../../../../core/application/useCases/compliance/GetComplianceBalanceUseCase';
import { GetAdjustedCBUseCase } from '../../../../core/application/useCases/compliance/GetAdjustedCBUseCase';
import { GetBankRecordsUseCase } from '../../../../core/application/useCases/banking/GetBankRecordsUseCase';
import { BankSurplusUseCase } from '../../../../core/application/useCases/banking/BankSurplusUseCase';
import { ApplyBankedUseCase } from '../../../../core/application/useCases/banking/ApplyBankedUseCase';
import { CreatePoolUseCase } from '../../../../core/application/useCases/pooling/CreatePoolUseCase';

export function createRoutes(pool: Pool): Router {
  const router = Router();

  const routeRepository = new PostgresRouteRepository(pool);
  const complianceRepository = new PostgresComplianceRepository(pool);
  const bankingRepository = new PostgresBankingRepository(pool);
  const poolRepository = new PostgresPoolRepository(pool);

  const routeController = new RouteController(
    new GetRoutesUseCase(routeRepository),
    new SetBaselineUseCase(routeRepository),
    new CompareRoutesUseCase(routeRepository)
  );

  const complianceController = new ComplianceController(
    new GetComplianceBalanceUseCase(complianceRepository, routeRepository),
    new GetAdjustedCBUseCase(complianceRepository, bankingRepository)
  );

  const bankingController = new BankingController(
    new GetBankRecordsUseCase(bankingRepository),
    new BankSurplusUseCase(bankingRepository, complianceRepository),
    new ApplyBankedUseCase(bankingRepository)
  );

  const poolController = new PoolController(
    new CreatePoolUseCase(poolRepository)
  );

  router.get('/routes', routeController.getRoutes);
  router.post('/routes/:id/baseline', routeController.setBaseline);
  router.get('/routes/comparison', routeController.compareRoutes);

  router.get('/compliance/cb', complianceController.getComplianceBalance);
  router.get('/compliance/adjusted-cb', complianceController.getAdjustedCB);

  router.get('/banking/records', bankingController.getBankRecords);
  router.post('/banking/bank', bankingController.bankSurplus);
  router.post('/banking/apply', bankingController.applyBanked);

  router.post('/pools', poolController.createPool);

  return router;
}
