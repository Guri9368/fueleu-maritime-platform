const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seedDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🚀 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    console.log('📄 Reading seed.sql file...');
    const seedSQL = fs.readFileSync(
      path.join(__dirname, '../database/seed.sql'),
      'utf8'
    );

    console.log('🌱 Seeding database with sample data...');
    await client.query(seedSQL);
    console.log('✅ Database seeded successfully!');

    // Verify data
    const result = await client.query('SELECT COUNT(*) as count FROM routes');
    console.log(`📊 Total routes in database: ${result.rows[0].count}`);

  } catch (error) {
    console.error('❌ Error seeding database:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('👋 Database connection closed');
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
