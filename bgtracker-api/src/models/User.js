const { Model } = require("objection");
const BaseModel = require("./BaseModel");
const Password = require("objection-password")();

class User extends Password(BaseModel) {
    static get tableName() {
        return "users";
    }

    static get relationMappings() {
        const Post = require("./Post");
        return {
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: "users.id",
                    to: "posts.user_id",
                },
            },
        };
    }

    static get modifiers() {
        return {
            selectUsername(builder) {
                builder.select("username");
            },
        };
    }
}

module.exports = User;
