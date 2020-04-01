const express = require("express");
const cors = require("cors");
const db = require("./db");
const UserRouter = require("./user/router");
const EventRouter = require("./events/router");
const TicketRouter = require("./tickets/router");
const CommentRouter = require("./comments/router");

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(express.json()); // body parser
app.use(UserRouter);
app.use(EventRouter);
app.use(TicketRouter);
app.use(CommentRouter);

app.listen(port, () => console.log(`the server is running on ${port}`));
