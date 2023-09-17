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
        const { userId: user_id } = req;

        const userInfoPromise = User.query()
            .select("username", "email", "created_at")
            .where("id", user_id);
        const postsCountPromise = Post.query()
            .count("id")
            .where("user_id", user_id);
        const commentsCountPromise = Comments.query()
            .count("id")
            .where("user_id", user_id);
        const likesCountPromise = Likes.query()
            .count("id")
            .where("user_id", user_id);
        const todosCountPromise = Todos.query()
            .count("id")
            .where("user_id", user_id);

        const [userInfo, postsCount, commentsCount, likesCount, todosCount] =
            await Promise.all([
                userInfoPromise,
                postsCountPromise,
                commentsCountPromise,
                likesCountPromise,
                todosCountPromise,
            ]);

        res.status(200).json({
            userInfo,
            postsCount,
            commentsCount,
            likesCount,
            todosCount,
            message: "Info was sended",
        });
    })
);

module.exports = router;
