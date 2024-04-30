module.exports = {
  client: 'mysql',
  connection: {
    database: 'shop_all',
    user:     'root',
    password: ''
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
