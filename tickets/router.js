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

router.post("/updaterisk", async (request, response, next) => {
  // //the inital risk can be given based on fixed parameters
  // //time of creation (given in 24 hr format)
  const timeHour = new Date(request.body.createdAt);
  const hora = timeHour.getHours();
  const lateRiskMeasure = hora > 9 && hora < 17 ? -10 : 10; //(3)

  //only one ticket (add 10%)
  const UserTickets = await Ticket.findAll({
    where: { userId: request.body.userId }
  });
  const userTicketCount = UserTickets.length;
  const isOnlyTicket = userTicketCount <= 1 ? 10 : 0; //(1)

  // //avg will decide about the % RISK above/below
  const ticketEventArray = await Ticket.findAll({
    where: { eventId: request.body.eventId }
  });
  const sumOfPrices = ticketEventArray.reduce((sum, item) => {
    return sum + item.dataValues.price;
  }, 0);
  const averageOfEventPrice = Math.floor(sumOfPrices / ticketEventArray.length);
  const percetage = Math.floor(
    (request.body.price * 100) / averageOfEventPrice
  );
  const avgRiskPercentage =
    averageOfEventPrice > request.body.price ? -percetage : percetage;

  // //FINAL RISK(INITIAL)
  const initRiskOfTicket = isOnlyTicket + lateRiskMeasure + averageOfEventPrice;
  // console.log("the RISK IS _______-----------", initRiskOfTicket);
  //add to the ticket
  const ticketFind = await Ticket.findByPk(request.body.id);
  ticketFind.risk = initRiskOfTicket;
  ticketFind.save();
  console.log("----------the final ticket with RISK----", ticketFind);
  response.send(ticketFind);
});

module.exports = router;
