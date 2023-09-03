const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
exports.seed = async (knex) => {
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
                },
            ]);
        });
};
