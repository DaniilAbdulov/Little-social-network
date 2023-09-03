const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const development = {
    client: "postgresql",
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./db/migrations",
    },
    seeds: {
        directory: "./db/seeds",
    },
};
const production = {
    client: "postgresql",
    connection: {
        database: "my_db",
        user: "username",
        password: "password",
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
};
module.exports = { development, production };
