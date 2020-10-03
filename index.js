const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const repo = require("./repositories/users.js");
const users = require("./repositories/users.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["grjoi5buo8l1v0uniu6lvr1s"],
  })
);

app.get("/signup", (req, res) => {
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

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await repo.getOneBy({ email });
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

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are logged out");
});

app.get("/signin", (req, res) => {
  res.send(`<div>
 Your id is: ${req.session.userId}
   <form method="post">
       <input name="email" placeholder="email" />
       <input name="password" placeholder="password" />
       <button>Sign in</button>
   </form>
 </div>`);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.getOneBy({ email });
  if (!user) {
    return res.send("email not found");
  }
  if (user.password !== password) {
    return res.send("invalid password");
  }
  req.session.userId = user.id;
  res.send("you have signed in");
});

app.listen(3000, () => {
  console.log("listening...");
});
