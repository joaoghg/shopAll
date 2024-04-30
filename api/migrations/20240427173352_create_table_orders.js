/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('orders', table => {
    table.increments('id').primary()
    table.decimal('totalPrice', 10, 2).notNullable()
    table.string('paymentMethod').notNullable()
    table.datetime('createdAt').defaultTo(knex.fn.now())
    table.integer('userId').unsigned().notNullable()
    table.integer('adressId').unsigned().notNullable()
    table.foreign('userId').references('users.id')
    table.foreign('adressId').references('adresses.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('orders')
};
