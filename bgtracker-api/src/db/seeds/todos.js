async function seed(knex) {
    return knex("todos")
        .del()
        .then(() => {
            return knex("todos").insert([
                {
                    id: 1,
                    user_id: 1, // This is an example user_id
                    body: "This is an example post body.",
                    completed: false,
                },
            ]);
        });
}
module.exports = { seed };
