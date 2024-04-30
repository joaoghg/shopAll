/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('order_products', table => {
    table.integer('id').primary()
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
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('order_products')
};
