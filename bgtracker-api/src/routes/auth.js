const express = require("express");
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");
let router = express.Router();

router.get("/currentUser", authenticate, async (req, res) => {
    const user = await User.query().findOne({ id: req.userId });
    if (user) {
        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    } else {
        res.status(404).json({});
    }
});

module.exports = router;
