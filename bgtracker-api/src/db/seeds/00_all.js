const seedUsers = require("./users");
const seedPosts = require("./posts");
exports.seed = async function (knex) {
    await seedUsers.seed(knex);
    await seedPosts.seed(knex);
};
