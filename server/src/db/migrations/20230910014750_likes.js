exports.up = function (knex) {
    return knex.schema.createTable("likes", (t) => {
        t.increments();
        t.integer("user_id").unsigned().notNullable();
        t.integer("post_id").unsigned().notNullable();
        t.dateTime("created_at").defaultTo(knex.fn.now());
        t.dateTime("updated_at").defaultTo(knex.fn.now());
        t.foreign("user_id").references("users.id").onDelete("CASCADE");
        t.foreign("post_id").references("posts.id").onDelete("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("likes");
};
