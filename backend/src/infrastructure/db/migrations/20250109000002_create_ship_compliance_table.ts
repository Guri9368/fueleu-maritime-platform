import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('ship_compliance', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    ship_id: {
      type: 'varchar(100)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    cb_gco2eq: {
      type: 'numeric(15, 2)',
      notNull: true,
    },
  });

  pgm.createIndex('ship_compliance', ['ship_id', 'year'], {
    unique: true,
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('ship_compliance');
}
