const BaseModel = require("./BaseModel");

class Post extends BaseModel {
    static get tableName() {
        return "posts";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "title", "body"],
            properties: {
                user_id: { type: "integer" },
                title: { type: "string" },
                body: { type: "string" },
            },
        };
    }
}

module.exports = Post;
