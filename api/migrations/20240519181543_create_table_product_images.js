/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.up = function(knex) {
    return knex.schema.createTable('product_images', table => {
      table.increments('id').primary()
      table.integer('productId').unsigned().notNullable()
      table.string('path')
      table.boolean('default').defaultTo(false)
      table.foreign('productId').references('products.id')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Knex.SchemaBuilder }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('product_images', function(table) {
        table.dropForeign('productId')
    })
    .then(function() {
        return knex.schema.dropTable('product_images')
    });
  };
  