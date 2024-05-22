require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: 'postgres://joaoghg:ZxyQ0xSijUotAKXCX9rdTumz6YwcNLbI@dpg-cp6m9dmv3ddc73fmn1tg-a.oregon-postgres.render.com/shop_all',
    port: 5432,
    database: 'shop_all',
    user:     'joaoghg',
    password: process.env.DATABASE_PASS
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
