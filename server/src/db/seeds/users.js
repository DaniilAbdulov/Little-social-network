const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
async function seed(knex) {
    const hashedPassword = await hashPassword("admin");
    return knex("users")
        .del()
        .then(() => {
            return knex("users").insert([
                {
                    id: 1,
                    email: "abdulov.dany@yandex.ru",
                    username: "admin",
                    password: hashedPassword,
                    role: "admin",
                },
            ]);
        });
}
module.exports = { seed };
