const seedUsers = require("./users");
const seedPosts = require("./posts");
const seedComments = require("./comments");
const seedTodos = require("./todos");
const seedLikes = require("./likes");
exports.seed = async function (knex) {
    await seedUsers.seed(knex);
    await seedPosts.seed(knex);
    await seedComments.seed(knex);
    await seedTodos.seed(knex);
    await seedLikes.seed(knex);
};
