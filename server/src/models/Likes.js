const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Likes extends BaseModel {
    static get tableName() {
        return "likes";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "post_id"],
            properties: {
                user_id: { type: "integer" },
                post_id: { type: "integer" },
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
                    from: "likes.user_id",
                    to: "users.id",
                },
            },
            post: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: "likes.post_id",
                    to: "post.id",
                },
            },
        };
    }
}

module.exports = Likes;
