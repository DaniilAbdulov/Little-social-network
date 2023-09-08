const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Todos extends BaseModel {
    static get tableName() {
        return "todos";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "body", "completed"],
            properties: {
                user_id: { type: "integer" },
                body: { type: "string" },
                completed: { type: "boolean" },
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
                    from: "todos.user_id",
                    to: "users.id",
                },
            },
        };
    }
}

module.exports = Todos;
