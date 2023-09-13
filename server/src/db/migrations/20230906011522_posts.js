exports.up = function (knex) {
    return knex.schema.createTable("posts", (t) => {
        t.increments();
        t.integer("user_id").unsigned().notNullable();
        t.string("title").notNullable();
        t.text("body").notNullable();
        t.dateTime("created_at").defaultTo(knex.fn.now());
        t.dateTime("updated_at").defaultTo(knex.fn.now());

        t.foreign("user_id").references("users.id").onDelete("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("posts");
};
