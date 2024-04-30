/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
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
 * @returns { Knex.SchemaBuilder }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('orders', function(table) {
    table.dropForeign('userId')
    table.dropForeign('adressId')
  })
  .then(function() {
    return knex.schema.dropTable('orders')
  });
};
