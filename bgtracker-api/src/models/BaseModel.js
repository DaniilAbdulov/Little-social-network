const { Model } = require("objection");

class BaseModel extends Model {
    $beforeInsert() {
        const now = new Date().toISOString();
        this.createdAt = now; // Corrected typo here
        this.updatedAt = now;
    }

    $beforeUpdate() {
        const now = new Date().toISOString();
        this.updatedAt = now;
    }
}

module.exports = BaseModel;
