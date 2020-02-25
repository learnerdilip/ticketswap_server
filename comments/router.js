const { Router } = require("express");
const Comment = require("./model");

const router = new Router();

router.post("/sendcomment", async (request, response, next) => {
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
    const allticketcomments = await Comment.findAll({
      where: {
        ticketId: request.body.ticketid
      }
    });
    
  } catch (error) {
    next(console.error);
  }
});

module.exports = router;
