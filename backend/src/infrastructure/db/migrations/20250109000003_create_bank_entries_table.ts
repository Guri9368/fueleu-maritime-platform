import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('bank_entries', {
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
    amount_gco2eq: {
      type: 'numeric(15, 2)',
      notNull: true,
    },
  });

  pgm.createIndex('bank_entries', 'ship_id');
  pgm.createIndex('bank_entries', ['ship_id', 'year']);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('bank_entries');
}
