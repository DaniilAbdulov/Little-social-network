async function seed(knex) {
    return knex("posts")
        .del()
        .then(() => {
            return knex("posts").insert([
                {
                    id: 1,
                    user_id: 1, // This is an example user_id
                    title: "Example Post",
                    body: "This is an example post body.",
                },
            ]);
        });
}
module.exports = { seed };
