const express = require("express");
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let router = express.Router();

router.get(
    "/currentUser",
    authenticate,
    asyncHandler(async (req, res) => {
        const user = await User.query()
            .findOne({ id: req.userId })
            .select("id", "email", "username", "role");

        res.status(200).json({ user });
    })
);
router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.query().findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
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
                    role: user.role,
                },
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        // Check for required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            // Check for existing username or email
            const usernameExists = await User.query().findOne({ username });
            if (usernameExists) {
                return res
                    .status(400)
                    .json({ message: "Username already exists" });
            }
            const emailExists = await User.query().findOne({ email });
            if (emailExists) {
                return res
                    .status(400)
                    .json({ message: "Email already exists" });
            }

            // Create new user without hashing password manually
            const newUser = await User.query().insert({
                username,
                email,
                password,
                role: "user",
            });

            // Return new user data
            res.status(201).json({
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
                message: "User successfully registered",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

module.exports = router;
