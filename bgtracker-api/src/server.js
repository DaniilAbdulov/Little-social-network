const app = require("./app");

app.listen(process.env.PORT, () =>
    console.log(`Running on ${process.env.PORT}`)
);
