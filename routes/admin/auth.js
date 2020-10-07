const express = require("express");

const { handleErrors } = require("./middlewares");
const users = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmed,
  requireEmailExists,
  requireValidPassword,
} = require("./validators");
const {} = require("./validators");
const {} = require("./validators");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmed],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await users.create({ email, password });
    req.session.userId = user.id;

    res.send("account created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidPassword],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await users.getOneBy({ email });

    req.session.userId = user.id;
    res.send("you have signed in");
  }
);

module.exports = router;
