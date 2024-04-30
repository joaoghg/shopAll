/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
const {Knex} = require("knex");
exports.up = function(knex) {
  return knex.schema.createTable('adresses', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('mobileNumber')
    table.string('houseNumber')
    table.string('street')
    table.string('landmark')
    table.string('city')
    table.string('country')
    table.string('cep')
    table.integer('userId').unsigned().notNullable()
    table.foreign('userId').references('users.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('adresses')
};
