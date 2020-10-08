const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["grjoi5buo8l1v0uniu6lvr1s"],
  })
);

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log("listening...");
});
