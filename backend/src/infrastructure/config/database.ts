import { config } from './env';

export interface DatabaseConfig {
  url: string;
}

export function getDatabaseConfig(): DatabaseConfig {
  return {
    url: config.DATABASE_URL,
  };
}
