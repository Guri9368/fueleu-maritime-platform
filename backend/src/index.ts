// import app from "./infrastructure/server/app";
// import dotenv from "dotenv";

// dotenv.config();

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


import { createApp } from './infrastructure/server/app';
import { getDbPool, closeDbPool } from './infrastructure/db/client';
import { config } from './infrastructure/config/env';

async function main() {
  try {
    const pool = getDbPool();

    await pool.query('SELECT NOW()');
    console.log('✅ Database connection established');

    const app = createApp(pool);

    const server = app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
      console.log(`📊 Environment: ${config.NODE_ENV}`);
    });

    const shutdown = async () => {
      console.log('\n🛑 Shutting down gracefully...');
      server.close(() => {
        console.log('✅ HTTP server closed');
      });

      await closeDbPool();
      console.log('✅ Database connections closed');
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main();
