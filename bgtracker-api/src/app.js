const express = require("express");
const { join } = require("path");
const { config } = require("dotenv");
const Knex = require("knex");
const { Model } = require("objection");

config();
const app = express();
//objection-setup
const knexfile = require("./knexfile");
const knex = Knex(knexfile[process.env.NODE_ENV]);
Model.knex(knex);
//objection-setup

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.sendFile(
        join(__dirname, "..", "..", "bgtracker-vue", "public", "index.html")
    );
});

module.exports = app;
