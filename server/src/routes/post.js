const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Post = require("../models/Post");

let router = express.Router();

const getPostData = (queryBuilder) => {
    return queryBuilder
        .select(
            "posts.id",
            "posts.title",
            "posts.body",
            "posts.created_at",
            "posts.user_id"
        )
        .leftJoinRelated("comments")
        .joinRelated("user as users")
        .withGraphFetched("user(selectUsername)")
        .modifiers({
            selectUsername(builder) {
                builder.select("username");
            },
        })
        .groupBy("posts.id", "users.id")
        .select((builder) => {
            builder
                .count("comments.id as comment_count")
                .from("comments")
                .whereRaw("comments.post_id = posts.id")
                .as("comment_count");
        })
        .select((builder) => {
            builder
                .count("likes.id as likes_count")
                .from("likes")
                .whereRaw("likes.post_id = posts.id")
                .as("likes_count");
        });
};

router.get(
    "/posts",
    asyncHandler(async (req, res) => {
        const postLength = await Post.query().count("id").first();
        const { requestedCountOfPosts, postLimit } = req.query;

        const allPosts = await getPostData(Post.query())
            .limit(postLimit)
            .offset(requestedCountOfPosts);

        res.status(200).json({
            posts: allPosts,
            posts_length: +postLength.count,
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

            const sendNewPost = await getPostData(Post.query()).where(
                "posts.id",
                newPost.id
            );

            res.status(201).json({
                post: sendNewPost,
                message: "Post successfully created",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

router.delete(
    "/deletepost",
    authenticate,
    asyncHandler(async (req, res) => {
        const { post_id, user_id } = req.body;

        if (
            !Number.isInteger(post_id) ||
            !Number.isInteger(user_id) ||
            post_id <= 0 ||
            user_id <= 0
        ) {
            return res.status(400).json({
                message: "Invalid post_id or user_id",
            });
        }

        if (req.userId !== user_id) {
            return res.status(403).json({
                message: "You can't delete posts by other users",
            });
        }

        try {
            const deletedPost = await Post.query().deleteById(post_id);

            if (deletedPost) {
                res.status(200).json({
                    message: "Post deleted successfully",
                });
            } else {
                res.status(404).json({
                    message: "Post not found or unauthorized",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    })
);

module.exports = router;
