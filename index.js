const express = require("express");
const db = require("./db");
const UserRouter = require("./user/router");
const EventRouter = require("./events/router");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
app.use(cors());
app.use(express.json()); // body parser
app.use(UserRouter);
app.use(EventRouter);

app.listen(port, () => console.log(`the server is running on ${port}`));
