require('dotenv').config();

const config = {
  client: 'pg',
  connection: {
    database: 'shop_all',
    user:     'postgres',
    password: process.env.DATABASE_PASS_TEST
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

const knex = require('knex')(config)

//knex.migrate.latest([config])
module.exports = knex
