/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.table('produtos', function(table) {
    table.integer('categorieId').unsigned();
    table.foreign('categorieId').references('categories.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.table('produtos', function(table) {
    table.dropForeign('categorieId');
    table.dropColumn('categorieId');
  })
};
