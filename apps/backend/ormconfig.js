module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3307, //port of docker or port of MySQL workbench?
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: ['entity/*.js'],
  migrationsTableName: 'table-migrations',
  migrations: ['dist/out-tsc/apps/backend/src/data/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/out-tsc/apps/backend/src/data/migrations'
  }
};
