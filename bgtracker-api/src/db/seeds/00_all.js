const seedUsers = require("./users");
const seedPosts = require("./posts");
const seedComments = require("./comments");
exports.seed = async function (knex) {
    await seedUsers.seed(knex);
    await seedPosts.seed(knex);
    await seedComments.seed(knex);
};
