import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('pools', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });

  pgm.createIndex('pools', 'year');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('pools');
}
