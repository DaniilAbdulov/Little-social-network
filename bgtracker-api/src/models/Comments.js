const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Comments extends BaseModel {
    static get tableName() {
        return "comments";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "post_id", "body"],
            properties: {
                user_id: { type: "integer" },
                post_id: { type: "integer" },
                body: { type: "string" },
            },
        };
    }

    static get relationMappings() {
        const User = require("./User");
        const Post = require("./Post");
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "comments.user_id",
                    to: "users.id",
                },
            },
            post: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: "comments.post_id",
                    to: "post.id",
                },
            },
        };
    }
}

module.exports = Comments;
