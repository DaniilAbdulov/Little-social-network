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
app.use("/api/post", require("./routes/post"));
app.use("/api/comment", require("./routes/comments"));
app.use("/api/todos", require("./routes/todos"));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "..", "..", "client", "public", "index.html"));
});
app.listen(process.env.PORT, () =>
    console.log(`Running on ${process.env.PORT}`)
);
module.exports = app;
