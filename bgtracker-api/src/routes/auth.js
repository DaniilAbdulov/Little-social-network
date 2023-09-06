const express = require("express");
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let router = express.Router();

router.get(
    "/currentUser",
    authenticate,
    asyncHandler(async (req, res) => {
        const user = await User.query()
            .findOne({ id: req.userId })
            .select("id", "email", "username", "role");

        res.status(200).json({ user });
    })
);
router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.query().findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = jwt.sign(
                { id: user.id, username: user.username, email: user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { username, email, password, repeatpassword } = req.body;
        // Check for required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password != repeatpassword) {
            return res
                .status(400)
                .json({ message: "Please check your password" });
        }

        try {
            const existingUser = await User.query()
                .where({ username })
                .orWhere({ email })
                .first();

            let errorMessage = "";

            if (existingUser) {
                if (existingUser.username === username) {
                    errorMessage += "Username already exists";
                }
                if (existingUser.email === email) {
                    if (errorMessage) {
                        errorMessage += " and ";
                    }
                    errorMessage += "Email already exists";
                }
                return res.status(400).json({ message: errorMessage });
            }
            // Create new user without hashing password manually
            const newUser = await User.query().insert({
                username,
                email,
                password,
                role: "user",
            });
            //SQL:INSERT INTO users...
            // Return new user data
            res.status(201).json({
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
                message: "User successfully registered",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    })
);

module.exports = router;

// auth.js - маршруты для аутентификации
// User.js - модель пользователя
// BaseModel.js - базовая модель, от которой наследуются другие модели.
// Маршрут /register обрабатывает HTTP POST-запрос. Когда пользователь отправляет форму регистрации с данными (имя пользователя, электронная почта, пароль и повторный ввод пароля), сервер запускает следующую асинхронную функцию с параметрами req и res:

// Из тела запроса req.body извлекаются имя пользователя, адрес электронной почты, пароль и повторный ввод пароля.
// Проверяем, введены ли все поля данных в запросе. Если нет, отправляем сообщение об ошибке с кодом статуса 400.
// Проверяем, соответствуют ли пароли. Если нет, отправляем сообщение об ошибке с кодом статуса 400.
// Проверяем, существует ли пользователь с указанными именем пользователя и адресом электронной почты в базе данных. Если они существуют, отправляем сообщение об ошибке с кодом статуса 400.
// Если нет ошибок, создаем нового пользователя с использованием модели User. Модель сама хеширует пароль с помощью утилиты objection-password. В роли пользователя задается значение по умолчанию - "user".
// К модели User применяется наследование от BaseModel, что позволяет его использовать для добавления даты создания и обновления. Это происходит в методах $beforeInsert и $beforeUpdate.
// Отправляем сообщение JSON с кодом 201 и информацией о пользователе, чтобы подтвердить успешную регистрацию.
// Все это происходит за счет использования моделей Objection.js, которые связывают логику приложения с базой данных. Они позволяют проводить проверки и трансформацию данных перед отправкой их в базу данных, также обеспечивают безопасное хэширование паролей и управление датами создания и обновления записей.
