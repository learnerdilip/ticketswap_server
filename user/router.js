const { Router } = require("express");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

const router = new Router();

router.post("/usersignup", (request, response, next) => {
  //validate request(do we have email and pasword in req.body)
  if (!request.body.email || !request.body.password) {
    return response.send({
      status: "error",
      error: "Missing email or password"
    });
  }
  const hashedPassword = bcrypt.hashSync(request.body.password, 10); //hash password using bcrypt
  const user = { ...request.body, password: hashedPassword };
  User.create(user)
    .then(user => response.send(user))
    .catch(e => {
      // console.log(JSON.stringify(e.errors[0].message, null, 2));
      response.send({
        error: true,
        message: "Something went wrong"
      });
    });
});

router.post("/userlogin", async (request, response) => {
  console.log(request.body);

  const user = await User.findOne({ where: { email: request.body.email } });

  const passwordValid = bcrypt.compareSync(
    request.body.password,
    user.password
  );

  if (passwordValid) {
    const userNew = {
      id: user.id,
      email: user.email,
      token: toJWT({ id: user.id })
    };
    return response.send(userNew);
  } else {
    return response.send({ error: true, message: "incorrect password" });
  }
});

module.exports = router;
