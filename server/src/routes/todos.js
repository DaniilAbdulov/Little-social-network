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
            .where("todos.user_id", user_id)
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

router.delete(
    "/deletetodo",
    authenticate,
    asyncHandler(async (req, res) => {
        const { todo_id } = req.body;
        try {
            const deletedTodo = await Todos.query().deleteById(todo_id);

            if (deletedTodo) {
                res.status(200).json({
                    message: "Todo successfully deleted",
                });
            } else {
                res.status(404).json({
                    message: "Todo not found",
                });
            }
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
        const userId = req.userId;
        const { todo_id } = req.body.data;
        try {
            const todo = await Todos.query()
                .findById(todo_id)
                .where("user_id", userId);

            if (todo) {
                const updatedTodo = await Todos.query()
                    .patch({
                        completed: !todo.completed,
                    })
                    .where("user_id", userId)
                    .where("id", todo_id)
                    .returning("*"); // Return the updated todo

                res.status(200).json({
                    todo: updatedTodo[0], // Return the first element of the updated todos array
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
