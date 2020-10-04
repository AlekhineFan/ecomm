const express = require("express");
const users = require("../../repositories/users");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(`
    <div>
    Your id is: ${req.session.userId}
      <form method="post">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <input name="passwordConfirmation" placeholder="password confirmation" />
          <button>Sign up</button>
      </form>
    </div>`);
});

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await users.getOneBy({ email });
  if (existingUser) {
    return res.send("Email address is already in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  const user = await users.create({ email, password });
  req.session.userId = user.id;

  res.send("account created");
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are logged out");
});

router.get("/signin", (req, res) => {
  res.send(`<div>
   Your id is: ${req.session.userId}
     <form method="post">
         <input name="email" placeholder="email" />
         <input name="password" placeholder="password" />
         <button>Sign in</button>
     </form>
   </div>`);
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
