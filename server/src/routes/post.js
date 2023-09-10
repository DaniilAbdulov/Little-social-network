const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Post = require("../models/Post");
const Likes = require("../models/Likes");

let router = express.Router();

// Получение всех постов из базы данных
router.get(
    "/allposts",
    asyncHandler(async (req, res) => {
        const userId = req.userId;
        const allPosts = await Post.query()
            .select("posts.id", "posts.title", "posts.body", "posts.created_at")
            .leftJoinRelated("comments")
            .joinRelated("user as users") // Make sure to alias "user" to "users" to match the given SQL syntax.
            .withGraphFetched("user(selectUsername)")
            .modifiers({
                selectUsername(builder) {
                    builder.select("username");
                },
            })
            .groupBy("posts.id", "users.id") // Group by 'users.id' instead of 'users.username' to handle duplicate usernames correctly.
            .select((builder) => {
                // Add comment count subquery
                builder
                    .count("comments.id as comment_count")
                    .from("comments")
                    .whereRaw("comments.post_id = posts.id")
                    .as("comment_count");
            })
            .select((builder) => {
                // Add likes count subquery
                builder
                    .count("likes.id as likes_count")
                    .from("likes")
                    .whereRaw("likes.post_id = posts.id")
                    .as("likes_count");
            });

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
