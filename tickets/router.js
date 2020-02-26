const { Router } = require("express");
const Ticket = require("./model");
const auth = require("../auth/middleWare");

const router = new Router();

router.post("/getticketlist", async (request, response, next) => {
  try {
    const eventTickets = await Ticket.findAll({
      where: {
        eventId: request.body.eventId
      }
    });
    response.json(eventTickets);
  } catch {
    error => next(console.error);
  }
});

router.post("/ticketpost", auth, async (request, response, next) => {
  try {
    const { price, description, title } = request.body.fullTicket;
    const eventId = request.body.eventId;
    const createTicket = await Ticket.create({
      price,
      description,
      title,
      eventId
    });
  } catch {
    error => next(console.error);
  }
});

module.exports = router;
