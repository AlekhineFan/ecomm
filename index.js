const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const repo = require("./repositories/users.js");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <div>
    <form method="post">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign up</button>
    </form>
  </div>`);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await repo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email address is already in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  res.send("account created");
});

app.listen(3000, () => {
  console.log("listening...");
});
