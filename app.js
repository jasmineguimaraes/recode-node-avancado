const express = require("express");

const app = express();
const port = 5000;

let router = require("./routes/router.js");

app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => console.info(`App listening on port: ${port}`));
