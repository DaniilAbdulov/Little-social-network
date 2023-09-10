const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Likes = require("../models/Likes");

let router = express.Router();

router.post(
    "/toggle",
    authenticate,
    asyncHandler(async (req, res) => {
        const userId = req.userId;
        const postId = parseInt(req.body.post_id, 10);

        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid post id" });
            return;
        }

        const existingLike = await Likes.query()
            .where("user_id", userId)
            .andWhere("post_id", postId)
            .first();

        if (existingLike) {
            await Likes.query().deleteById(existingLike.id);
            res.status(200).json({ message: "Like removed" });
        } else {
            try {
                const newLike = await Likes.query().insert({
                    user_id: userId,
                    post_id: postId,
                });

                res.status(200).json({ message: "Like added" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Server error" });
            }
        }
    })
);

module.exports = router;
