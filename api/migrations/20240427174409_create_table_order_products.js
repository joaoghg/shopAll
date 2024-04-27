/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('order_products', table => {
    table.integer('id').primary()
    table.integer('orderId').references('id')
      .inTable('orders').notNullable()
    table.integer('productId').references('id')
      .inTable('products').notNullable()
    table.integer('quantity').notNullable()
    table.decimal('price', 10, 2)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('order_products')
};
