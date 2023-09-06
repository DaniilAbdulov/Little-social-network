exports.up = function (knex) {
    return knex.schema.createTable("posts", (t) => {
        t.increments();
        t.integer("user_id").unsigned().notNullable();
        t.string("title").notNullable();
        t.string("body").notNullable();
        t.dateTime("createdAt");
        t.dateTime("updatedAt");

        t.foreign("user_id").references("users.id").onDelete("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("posts");
};
