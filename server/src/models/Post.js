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
        const Comments = require("./Comments");
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "posts.user_id",
                    to: "users.id",
                },
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: "posts.id",
                    to: "comments.post_id",
                },
            },
        };
    }
}

module.exports = Post;
