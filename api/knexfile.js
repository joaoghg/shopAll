module.exports = {
  client: 'mysql',
  connection: {
    database: 'shop_all',
    user:     'root',
    password: 'root'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
