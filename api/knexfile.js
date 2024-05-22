require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    database: 'shop_all',
    user:     'postgres',
    password: process.env.DATABASE_PASS
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
