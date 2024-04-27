/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('orders', table => {
    table.increments('id').primary()
    table.integer('userId').references('id')
      .inTable('users').notNullable()
    table.integer('adressId').references('id')
      .inTable('adresses').notNullable()
    table.decimal('totalPrice', 10, 2).notNullable()
    table.string('paymentMethod').notNullable()
    table.datetime('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('orders')
};
