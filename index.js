const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["grjoi5buo8l1v0uniu6lvr1s"],
  })
);

app.use(authRouter);

app.listen(3000, () => {
  console.log("listening...");
});
