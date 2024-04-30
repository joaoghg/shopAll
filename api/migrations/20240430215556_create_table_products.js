/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.integer('id').primary()
    table.string('name').notNullable()
    table.decimal('price', 10, 2)
    table.string('image').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('products')
};
