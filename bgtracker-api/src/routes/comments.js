const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Comments = require("../models/Comments");

let router = express.Router();

router.get(
    "/commentsofpost",
    asyncHandler(async (req, res) => {
        const allComments = await Comments.query();
        res.status(200).json({
            comments: allComments,
            message: "All comments retrieved successfully",
        });
    })
);

router.post(
    "/newcomment",
    authenticate,
    asyncHandler(async (req, res) => {
        try {
            const newComment = await Comments.query()
                .insert({
                    user_id: req.userId,
                    post_id: +req.body.post_id,
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
