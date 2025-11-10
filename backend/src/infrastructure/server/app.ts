import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Pool } from 'pg';
import { createRoutes } from '../../adapters/inbound/http/routes';
import { errorHandler } from '../../adapters/inbound/http/middleware/errorHandler';

export function createApp(pool: Pool): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const apiRoutes = createRoutes(pool);
  app.use('/api', apiRoutes);

  app.use(errorHandler);

  return app;
}
