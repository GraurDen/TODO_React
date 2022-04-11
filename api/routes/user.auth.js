const Router = require("express");
const { body } = require("express-validator");
const { users } = require("../models/index");
const { handleErrors, generateAccessToken } = require("../helpers");
const userAuthRouter = new Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

userAuthRouter.post(
  "/auth",
  body("password")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 chars long"),
  body("name")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 chars long"),
  handleErrors,

  async (req, res) => {
    const { name, password } = req.body;

    try {
      const user = await users.findOne({
        where: { name },
      });

      if (!user) {
        return res.status(400).send({
          message: `There is no user with name: ${name}`,
        });
      }

      // Compare passwords
      if (!bcrypt.compare(password, user.password)) {
        return res.status(400).send({ message: "Password is incorrect" });
      }

      // Generate access token with 'user.id' inside
      const token = generateAccessToken(user.id, name);

      res.status(200).send({ token: token });
      //
    } catch (error) {
      console.log(error);
      res.send({ message: "Login error" });
    }
  }
);

module.exports = userAuthRouter;
