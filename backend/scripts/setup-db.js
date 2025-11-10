const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🚀 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    console.log('📄 Reading schema.sql file...');
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, '../database/schema.sql'),
      'utf8'
    );

    console.log('🔨 Creating database tables...');
    await client.query(schemaSQL);
    console.log('✅ Database schema created successfully!');
    console.log('📊 Tables created: routes, ship_compliance, bank_entries, pools, pool_members');

  } catch (error) {
    console.error('❌ Error setting up database:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('👋 Database connection closed');
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
