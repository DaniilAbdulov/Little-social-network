async function seed(knex) {
    return knex("likes")
        .del()
        .then(() => {
            return knex("likes").insert([
                {
                    id: 1,
                    user_id: 1,
                    post_id: 1,
                },
            ]);
        });
}
module.exports = { seed };
