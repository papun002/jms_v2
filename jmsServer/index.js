const express = require("express")
const app = express();
const body_parser = require("body-parser");
// const mongoose = require("mongoose");
const conn = require("./db/conn");
const cors = require("cors")
const route = require("./routes/ClientRoutes.js");
const dotenv = require('dotenv').config();


const PORT = dotenv.parsed.PORT

app.use(body_parser.json({ limit: '10mb' }));
app.use(body_parser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

//Client Login Auth
app.use("/clientloginauth", route);
app.use("/client", route);
app.use("/payment", route);
// app.use("/staffs", route);
// app.use("/cat", route);
// app.use("/pdt", route);

// console.log(dotenv.parsed.RAZOR_PAY_KEY_API)

// key passing
app.get("/api/getkey", (req, res) => res.status(200).json({ key: dotenv.parsed.RAZOR_PAY_KEY_API }))


app.use("/", (req, res, next) => {
    res.send(`<h1>Server Started</h1>`);
});

// Database Connection...
conn.authenticate().then((err) => {
    console.log("Connected to Database...");

    // Node Server Started...
    app.listen(PORT, (err) => {
        if (err) {
            console.error("Server Faild to Start...");
        }
        console.log("Server Started...");
    });
})
