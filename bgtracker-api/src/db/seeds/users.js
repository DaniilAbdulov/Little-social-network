exports.seed = (knex) => {
    return knex("users")
        .del()
        .then(() => {
            return knex("users").insert([
                {
                    id: 1,
                    email: "abdulov.dany@yandex.ru",
                    username: "danila",
                    password: "2324532sdfvsdfgfgdgs",
                },
            ]);
        });
};
