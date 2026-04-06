require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const conn = require("../db/conn");
const router = require("../routes/router");
const DefaultData = require("../defaultdata");
const port = 8005;

app.use(express.json());
app.use(cookieParser());
app.use("/", router);

const start = async () => {
    try {
        await conn();
        console.log("MongoDB connected");
        await DefaultData();
        console.log("Default data loaded");
        app.listen(port, () => {
            console.log(`server is running on port number ${port}`);
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};

start();