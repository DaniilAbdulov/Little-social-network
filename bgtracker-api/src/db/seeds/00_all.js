const seedUsers = require("./users");
const seedPosts = require("./posts");
const seedComments = require("./comments");
const seedTodos = require("./todos");
exports.seed = async function (knex) {
    await seedUsers.seed(knex);
    await seedPosts.seed(knex);
    await seedComments.seed(knex);
    await seedTodos.seed(knex);
};
