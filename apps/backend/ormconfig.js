module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: ['apps/backend/src/data/models/*.ts'],
  seeds: ['apps/backend/src/data/seeds/*.ts'],
  migrationsTableName: 'table-migrations',
  migrations: ['apps/backend/src/data/migrations/*.ts'],
  cli: {
    migrationsDir: 'apps/backend/src/data/migrations'
  }
};
