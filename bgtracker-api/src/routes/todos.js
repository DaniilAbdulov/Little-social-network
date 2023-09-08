const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Todos = require("../models/Todos");

let router = express.Router();

router.get(
    "/todosofuser/",
    authenticate,
    asyncHandler(async (req, res) => {
        const user_id = req.userId;
        const todosOfUser = await Todos.query()
            .select("todos.id", "todos.body", "todos.completed")
            .join("users", "users.id", "todos.user_id")
            .where("todos.user_id", user_id);

        res.status(200).json({
            todos: todosOfUser,
            message: "All todos retrieved successfully",
        });
    })
);

router.post(
    "/newtodo",
    authenticate,
    asyncHandler(async (req, res) => {
        const { body } = req.body;
        try {
            const newTodo = await Todos.query()
                .insert({
                    user_id: req.userId,
                    body,
                    completed: false,
                })
                .skipUndefined();
            res.status(201).json({
                todo: {
                    id: newTodo.id,
                    user_id: newTodo.user_id,
                    body: newTodo.body,
                    completed: newTodo.completed,
                },
                message: "Todo successfully created",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

module.exports = router;
