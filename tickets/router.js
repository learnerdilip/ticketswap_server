const { Router } = require("express");
const Ticket = require("./model");

const router = new Router();

router.post("/ticketpost", async (request, response, next) => {
  try {
    const { price, description, title } = request.body.fullTicket;
    const eventId = request.body.eventId;
    const createTicket = Ticket.create({ price, description, title, eventId });
  } catch {
    error => next(console.error);
  }
});

router.get("/getticketlist", async (request, response, next) => {
  try {
    console.log("the ticket list request--------------------------", request);

    // const
  } catch {
    error => next(console.error);
  }
});

module.exports = router;
