module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3307, //port of docker or port of MySQL workbench?
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: ['entity/*.js'],
  migrationsTableName: 'table-migrations',
  migrations: ['./data/migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations'
  }
};
