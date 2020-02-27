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
    // //the inital risk can be given based on fixed parameters

    // //time of creation (given in 24 hr format)
    console.log("****************************************", request.body);
    // const timeHour = new Date(request.body.fullTicket.createdAt);
    // const hora = timeHour.getHours();
    // const lateRiskMeasure = hora > 9 && hora < 17 ? -10 : 10; //(3)

    // //only one ticket (add 10%)
    // const UserTickets = await User.findAll({
    //   where: { userId: request.body.userid }
    // });
    // const userTicketCount = UserTickets.length;
    // const isOnlyTicket = userTicketCount <= 1 ? 10 : 0; //(1)

    // //avg will decide about the % RISK above/below
    // const ticketEventArray = await Ticket.findAll({
    //   where: { eventId: request.body.eventId }
    // });
    // const sumOfPrices = sum.reduce((sum, item) => {
    //   return sum + item.dataValues.price;
    // }, 0);
    // const averageOfEventPrice = Math.floor(ticketEventArray / sumOfPrices);
    // const percetage = Math.floor(
    //   (request.body.fullTicket.price * 100) / averageOfEventPrice
    // );
    // console.log(
    //   "the --------params for risk -----",
    //   lateRiskMeasure,
    //   isOnlyTicket,
    //   percetage
    // );

    // //FINAL RISK(INITIAL)
    // // const initRiskOfTicket = 90;

    //normal search and response
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
