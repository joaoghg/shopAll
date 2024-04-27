/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const {Knex} = require("knex");
exports.up = function(knex) {
  return knex.schema.createTable('adresses', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('mobile_number')
    table.string('house_number')
    table.string('street')
    table.string('landmark')
    table.string('city')
    table.string('country')
    table.string('cep')
    table.integer('userId').references('id')
      .inTable('users').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('adresses')
};
