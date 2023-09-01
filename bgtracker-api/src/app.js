const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "bgtracker-vue", "public", "index.html")
    );
});

module.exports = app;
