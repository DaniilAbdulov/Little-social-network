const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const User = require("../models/User");
const Post = require("../models/Post");
const Comments = require("../models/Comments");
const Likes = require("../models/Likes");
const Todos = require("../models/Todos");

let router = express.Router();

router.get(
    "/info/",
    authenticate,
    asyncHandler(async (req, res) => {
        const user_id = req.userId;
        const userInfo = await User.query()
            .select("username", "email", "created_at")
            .where("id", user_id);
        const postsCount = await Post.query()
            .count("id")
            .where("user_id", user_id);
        const commentsCount = await Comments.query()
            .count("id")
            .where("user_id", user_id);
        const likesCount = await Likes.query()
            .count("id")
            .where("user_id", user_id);
        const todosCount = await Todos.query()
            .count("id")
            .where("user_id", user_id);

        res.status(200).json({
            userInfo: userInfo,
            postsCount: postsCount,
            commentsCount: commentsCount,
            likesCount: likesCount,
            todosCount: todosCount,
            message: "Info was sended",
        });
    })
);

module.exports = router;
