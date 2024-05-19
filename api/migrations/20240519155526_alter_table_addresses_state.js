/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.table('addresses', function(table) {
    table.string('neighborhood')
    table.string('state')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.table('addresses', function(table) {
    table.dropColumn('neighborhood')
    table.dropColumn('state')
  })
};
