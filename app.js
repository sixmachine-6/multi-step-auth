const express = require("express");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const cookieParser = require("cookie-parser");
const pug = require("pug");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
module.exports = app;
