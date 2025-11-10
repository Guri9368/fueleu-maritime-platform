// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// export const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });


import { Pool } from 'pg';
import { getDatabaseConfig } from '../config/database';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const config = getDatabaseConfig();
    pool = new Pool({
      connectionString: config.url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected database error:', err);
    });
  }

  return pool;
}

export async function closeDbPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
