const { Router } = require("express");
const Ticket = require("./model");
const User = require("../user/model");
const auth = require("../auth/middleWare");
// const Sequelize = require("sequelize");

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
    //time of creation (given in 24 hr format)
    const timeHour = new Date(request.body.fullTicket.createdAt);
    const hora = timeHour.getHours();

    //avg will decide about the 10%
    const ticketEventArray = await Ticket.findAll({
      where: { eventId: request.body.eventId }
    });
    const sumOfPrices = sum.reduce((sum, item) => {
      return sum + item.dataValues.price;
    }, 0);
    const averageOfEventPrice = Math.floor(ticketEventArray / sumOfPrices);
    //only one ticket (add 10%)
    const UserTickets = await User.findAll({
      where: { userId: request.body.userid }
    });
    const userTicketLen = averageOfEventPrice.length;

    const { price, description, title } = request.body.fullTicket;
    const eventId = request.body.eventId;
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
