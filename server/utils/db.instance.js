import { Sequelize } from 'sequelize';
const config = useRuntimeConfig();

export const sequelize = new Sequelize(
  config.DATABASE,
  config.DATABASE_ACCOUNT,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: 'Amazon RDS',
    },
    logging: false,
    maxConcurrentQueries: 100,
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: 'en',
  }
);
