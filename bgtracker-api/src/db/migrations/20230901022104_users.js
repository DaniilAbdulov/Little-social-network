exports.up = function (knex) {
    return knex.schema.createTable("users", (t) => {
        t.increments();
        t.string("username").unique().notNullable();
        t.string("email").unique().notNullable();
        t.string("password").notNullable();
        t.string("role").notNullable();
        t.dateTime("created_at").defaultTo(knex.fn.now());
        t.dateTime("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
