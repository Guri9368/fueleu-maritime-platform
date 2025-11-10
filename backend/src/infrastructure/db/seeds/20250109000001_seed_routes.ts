import { getDbPool } from '../client';

async function seedRoutes() {
  const pool = getDbPool();

  const routes = [
    {
      routeId: 'R001',
      vesselType: 'Container',
      fuelType: 'HFO',
      year: 2024,
      ghgIntensity: 91.0,
      fuelConsumption: 5000,
      distance: 12000,
      totalEmissions: 4500,
    },
    {
      routeId: 'R002',
      vesselType: 'BulkCarrier',
      fuelType: 'LNG',
      year: 2024,
      ghgIntensity: 88.0,
      fuelConsumption: 4800,
      distance: 11500,
      totalEmissions: 4200,
    },
    {
      routeId: 'R003',
      vesselType: 'Tanker',
      fuelType: 'MGO',
      year: 2024,
      ghgIntensity: 93.5,
      fuelConsumption: 5100,
      distance: 12500,
      totalEmissions: 4700,
    },
    {
      routeId: 'R004',
      vesselType: 'RoRo',
      fuelType: 'HFO',
      year: 2025,
      ghgIntensity: 89.2,
      fuelConsumption: 4900,
      distance: 11800,
      totalEmissions: 4300,
    },
    {
      routeId: 'R005',
      vesselType: 'Container',
      fuelType: 'LNG',
      year: 2025,
      ghgIntensity: 90.5,
      fuelConsumption: 4950,
      distance: 11900,
      totalEmissions: 4400,
    },
  ];

  try {
    for (const route of routes) {
      await pool.query(
        `INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, 
         fuel_consumption, distance_km, total_emissions, is_baseline)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
         ON CONFLICT (route_id) DO NOTHING`,
        [
          route.routeId,
          route.vesselType,
          route.fuelType,
          route.year,
          route.ghgIntensity,
          route.fuelConsumption,
          route.distance,
          route.totalEmissions,
        ]
      );
    }

    console.log('Routes seeded successfully');
  } catch (error) {
    console.error('Error seeding routes:', error);
    throw error;
  }
}

if (require.main === module) {
  seedRoutes()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seedRoutes;
