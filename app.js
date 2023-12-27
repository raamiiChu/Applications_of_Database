import "dotenv/config";
import express from "express";

import sequelize from "./db.js";

import { generateRoute } from "./routes/index.js";

const app = express();
const port = 3000;

sequelize.sync();

app.use("/generate", generateRoute);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/healthcheck", (req, res) => {
    res.send("OK");
});

app.get("/test", (req, res) => {
    res.send("test");
});

app.get("*", (req, res) => {
    res.send("404 page not found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
