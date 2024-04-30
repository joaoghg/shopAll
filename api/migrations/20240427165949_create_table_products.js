/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('products', table => {
    table.integer('id').primary()
    table.string('name').notNullable()
    table.decimal('price', 10, 2)
    table.string('image').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('products')
};
