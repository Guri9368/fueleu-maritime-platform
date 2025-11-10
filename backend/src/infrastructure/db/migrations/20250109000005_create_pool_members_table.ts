import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('pool_members', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    pool_id: {
      type: 'integer',
      notNull: true,
      references: 'pools',
      onDelete: 'CASCADE',
    },
    ship_id: {
      type: 'varchar(100)',
      notNull: true,
    },
    cb_before: {
      type: 'numeric(15, 2)',
      notNull: true,
    },
    cb_after: {
      type: 'numeric(15, 2)',
      notNull: true,
    },
  });

  pgm.createIndex('pool_members', 'pool_id');
  pgm.createIndex('pool_members', 'ship_id');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('pool_members');
}
