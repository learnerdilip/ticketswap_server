const { Router } = require("express");
const Event = require("./model");

const router = new Router();

router.post("/postevent", async (request, response, next) => {
  // console.log("THE REQUERST FOR POST EVENTS", request.body);
  try {
    const tempevent = await Event.create({
      name: request.body.title,
      description: request.body.description,
      imageUrl: request.body.imageurl,
      startDate: request.body.start_date,
      endDate: request.body.end_date
    });
    // console.log("temp Event---------------", tempevent.dataValues);
    response.send(tempevent.dataValues);
  } catch (error) {
    next(console.error);
  }
});

router.get("/getevents", async (request, response, next) => {
  try {
    const allEvents = await Event.findAll();
    response.send(allEvents);
  } catch {
    error => next(console.error);
  }
});

module.exports = router;
