const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const Todos = require("../models/Todos");

let router = express.Router();

router.get(
    "/todosofuser/",
    authenticate,
    asyncHandler(async (req, res) => {
        const todosOfUser = await Todos.query()
            .select("todos.id", "todos.body", "todos.completed")
            .join("users", "users.id", "todos.user_id")
            .where("todos.user_id", req.userId)
            .orderBy("todos.created_at", "desc");

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
        try {
            const { body } = req.body;
            const newTodo = await Todos.query().insert({
                user_id: req.userId,
                body,
                completed: false,
            });

            res.status(201).json({
                todo: { ...newTodo },
                message: "Todo successfully created",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

router.delete(
    "/deletetodo",
    authenticate,
    asyncHandler(async (req, res) => {
        try {
            const { todo_id } = req.body;
            const deletedTodo = await Todos.query().deleteById(todo_id);

            res.status(deletedTodo ? 200 : 404).json({
                message: deletedTodo
                    ? "Todo successfully deleted"
                    : "Todo not found",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete todo" });
        }
    })
);

router.patch(
    "/changecomplete",
    authenticate,
    asyncHandler(async (req, res) => {
        try {
            const { todo_id } = req.body.data;
            const todo = await Todos.query()
                .findById(todo_id)
                .where("user_id", req.userId);

            if (todo) {
                const [updatedTodo] = await Todos.query()
                    .patch({ completed: !todo.completed })
                    .where({ user_id: req.userId, id: todo_id })
                    .returning("*");

                res.status(200).json({
                    todo: updatedTodo,
                    message: "Todo completion status successfully updated",
                });
            } else {
                res.status(404).json({
                    message: "Todo not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to change todo" });
        }
    })
);

module.exports = router;
