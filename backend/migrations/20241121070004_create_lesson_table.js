/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lesson", function (table) {
    table.increments("id").primary();
    table.integer("store_id").unsigned().notNullable().references("id").inTable("store").onDelete("CASCADE");
    table.date("date").notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.string("location", 255).notNullable();
    table.string("description", 255).notNullable();
    table.string("imagePath", 255).notNullable();
    table.string("moviePath", 255).notNullable();
    table.integer("review").nullable();
    table.float("indicator").notNullable();
    table.integer("momentum").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lesson");
};
