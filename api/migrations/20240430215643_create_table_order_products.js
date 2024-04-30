/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_products', table => {
    table.increments('id').primary()
    table.integer('quantity').notNullable()
    table.decimal('price', 10, 2)
    table.integer('orderId').unsigned().notNullable()
    table.integer('productId').unsigned().notNullable()
    table.foreign('orderId').references('orders.id')
    table.foreign('productId').references('products.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('order_products', function(table) {
    table.dropForeign('orderId')
    table.dropForeign('productId')
  })
  .then(function() {
    return knex.schema.dropTable('order_products')
  });
};
