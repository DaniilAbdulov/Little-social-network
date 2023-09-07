const { Model } = require("objection");
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

    static get relationMappings() {
        const User = require("./User");
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "posts.user_id",
                    to: "users.id",
                },
            },
        };
    }
}

module.exports = Post;
