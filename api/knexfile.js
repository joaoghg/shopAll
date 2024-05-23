require('dotenv').config();

//main
module.exports = {
  client: 'pg',
  connection: {
    connectionString: 'postgres://joaoghg:ZxyQ0xSijUotAKXCX9rdTumz6YwcNLbI@dpg-cp6m9dmv3ddc73fmn1tg-a.oregon-postgres.render.com/shop_all',
    ssl: {
      rejectUnauthorized: false
    },
    port: 5432,
    database: 'shop_all',
    user:     'joaoghg',
    password: process.env.DATABASE_PASS
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

//Test
/*module.exports = {
  client: 'pg',
  connection: {
    database: 'shop_all',
    user:     'postgres',
    password: process.env.DATABASE_PASS_TEST
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}*/

