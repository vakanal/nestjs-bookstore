import { registerAs } from '@nestjs/config';

export default registerAs('configData', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.BD_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['src/**/*.entity.{ts,js}'],
    migrationsTableName: 'custom_migration_table',
    migrations: ['migration/*.{ts,js}'],
    cli: {
      migrationsDir: 'migration',
    },
    synchronize: true,
    autoLoadEntities: true,
  },
}));
