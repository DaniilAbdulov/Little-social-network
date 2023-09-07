async function seed(knex) {
    return knex("comments")
        .del()
        .then(() => {
            return knex("comments").insert([
                {
                    id: 1,
                    user_id: 1,
                    post_id: 1,
                    body: "This is an example comment",
                },
            ]);
        });
}
module.exports = { seed };
