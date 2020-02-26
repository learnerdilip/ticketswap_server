const { Router } = require("express");
const Comment = require("./model");
const auth = require("../auth/middleWare");

const router = new Router();

router.post("/sendcomment", auth, async (request, response, next) => {
  try {
    // console.log("---------------the request", request.body);
    const { userid, ticketid, text } = request.body;
    const temp = await Comment.create({
      text: text,
      userId: userid,
      ticketId: ticketid
    });
  } catch (error) {
    next(console.error);
  }
});

router.post("/getticketcomments", async (request, response, next) => {
  try {
    // console.log("request.body----------------------------", request.body);
    const allticketcomments = await Comment.findAll({
      where: {
        ticketId: request.body.ticketid
      }
    });
    response.json(allticketcomments);
  } catch (error) {
    next(console.error);
  }
});

module.exports = router;
