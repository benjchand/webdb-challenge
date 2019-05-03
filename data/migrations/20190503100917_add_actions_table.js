exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments();

    tbl
      .string("description", 256)
      .notNullable()
      .unique();

    tbl.string("notes", 256);

    tbl
      .integer("completed")
      .unsigned()
      .notNullable();

    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
