import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('routes', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    route_id: {
      type: 'varchar(50)',
      notNull: true,
      unique: true,
    },
    vessel_type: {
      type: 'varchar(100)',
      notNull: true,
    },
    fuel_type: {
      type: 'varchar(50)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    ghg_intensity: {
      type: 'numeric(10, 2)',
      notNull: true,
    },
    fuel_consumption: {
      type: 'numeric(10, 2)',
      notNull: true,
    },
    distance_km: {
      type: 'numeric(10, 2)',
      notNull: true,
    },
    total_emissions: {
      type: 'numeric(10, 2)',
      notNull: true,
    },
    is_baseline: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
  });

  pgm.createIndex('routes', 'vessel_type');
  pgm.createIndex('routes', 'fuel_type');
  pgm.createIndex('routes', 'year');
  pgm.createIndex('routes', 'is_baseline');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('routes');
}
