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
                "comments.created_at",
                "comments.user_id"
            )
            .join("users", "users.id", "comments.user_id")
            .where("comments.post_id", postId)
            .orderBy("comments.created_at", "desc");

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
router.delete(
    "/deletecomment",
    authenticate,
    asyncHandler(async (req, res) => {
        const { comment_id, user_id } = req.body;
        if (
            !Number.isInteger(comment_id) ||
            !Number.isInteger(user_id) ||
            comment_id <= 0 ||
            user_id <= 0
        ) {
            return res.status(400).json({
                message: "Invalid comment_id or user_id",
            });
        }
        if (req.userId !== user_id) {
            return res.status(403).json({
                message: "You can't delete comments by other users",
            });
        }
        try {
            const deletedComment = await Comments.query().deleteById(
                comment_id
            );

            if (deletedComment) {
                res.status(200).json({
                    message: "Comment deleted successfully",
                });
            } else {
                res.status(404).json({
                    message: "Comment not found or unauthorized",
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
