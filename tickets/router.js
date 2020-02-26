const { Router } = require("express");
const Ticket = require("./model");
const User = require("../user/model");
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
    const eventId = request.body.eventid;
    const userId = request.body.userid;
    const createTicket = await Ticket.create({
      price,
      description,
      title,
      eventId,
      userId
    });

    response.send(createTicket);
  } catch {
    error => next(console.error);
  }
});

module.exports = router;
