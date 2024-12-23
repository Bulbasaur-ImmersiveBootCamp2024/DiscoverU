/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_hobby", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("hobby_id").notNullable().references("id").inTable("hobby").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_hobby");
};
