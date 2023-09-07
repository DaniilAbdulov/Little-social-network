const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Post = require("../models/Post");

let router = express.Router();

// Получение всех постов из базы данных
router.get(
    "/allposts",
    asyncHandler(async (req, res) => {
        const allPosts = await Post.query()
            .select("posts.title", "posts.body", "posts.created_at")
            .joinRelated("user", { alias: "users" })
            .withGraphFetched("user(selectUsername)");
        res.status(200).json({
            posts: allPosts,
            message: "All posts retrieved successfully",
        });
    })
);

router.post(
    "/newpost",
    authenticate,
    asyncHandler(async (req, res) => {
        const { title, body } = req.body;
        try {
            const newPost = await Post.query()
                .insert({
                    user_id: req.userId,
                    title,
                    body,
                })
                .skipUndefined();
            res.status(201).json({
                post: {
                    id: newPost.id,
                    user_id: newPost.user_id,
                    title: newPost.title,
                    body: newPost.body,
                },
                message: "Post successfully created",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

module.exports = router;
