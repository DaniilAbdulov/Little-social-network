const express = require("express");
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.query().findOne({ username });
        if (!user) {
            console.error(`Invalid username for user: ${username}`);
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            if (!password) {
                console.log("password is empty. But why ?");
            }
            console.error(
                `Invalid password for user: ${password} "not equal" ${user.password}}`
            );
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
