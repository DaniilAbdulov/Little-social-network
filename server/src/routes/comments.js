const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Comments = require("../models/Comments");

let router = express.Router();

router.get(
    "/commentsofpost/:postId",
    asyncHandler(async (req, res) => {
        const postId = parseInt(req.params.postId, 10);

        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid post id" });
            return;
        }
        const commentsOfPost = await Comments.query()
            .select(
                "users.username",
                "comments.id",
                "comments.body",
                "comments.created_at"
            )
            .join("users", "users.id", "comments.user_id")
            .where("comments.post_id", postId);

        res.status(200).json({
            comments: commentsOfPost,
            message: "All comments retrieved successfully",
        });
    })
);

router.post(
    "/newcomment",
    authenticate,
    asyncHandler(async (req, res) => {
        const postId = parseInt(req.body.post_id, 10);

        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid post id" });
            return;
        }
        try {
            const newComment = await Comments.query()
                .insert({
                    user_id: req.userId,
                    post_id: postId,
                    body: req.body.body,
                })
                .skipUndefined();
            res.status(201).json({
                post: {
                    id: newComment.id,
                    user_id: newComment.user_id,
                    post_id: newComment.post_id,
                    body: newComment.body,
                },
                message: "Comment successfully created",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

module.exports = router;
