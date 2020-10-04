const express = require("express");
const { check, validationResult } = require("express-validator");
const users = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const { requireEmail } = require("./validators");
const { requirePassword } = require("./validators");
const { requirePasswordConfirmed } = require("./validators");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmed],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    const { email, password, passwordConfirmation } = req.body;

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
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.getOneBy({ email });
  if (!user) {
    return res.send("email not found");
  }
  const validPass = await users.comparePasswords(user.password, password);
  if (!validPass) {
    return res.send("invalid password");
  }
  req.session.userId = user.id;
  res.send("you have signed in");
});

module.exports = router;
