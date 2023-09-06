const BaseModel = require("./BaseModel");

class Post extends BaseModel {
    static get tableName() {
        return "posts";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "user_name", "title", "body"],
            properties: {
                user_id: { type: "integer" },
                user_name: { type: "string" },
                title: { type: "string" },
                body: { type: "string" },
            },
        };
    }
}

module.exports = Post;
