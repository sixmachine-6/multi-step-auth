const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const Email = require("./utils/email");
// console.log("printing", typeof Email);
// const email = new Email(
//   { email: "undefined", name: "undefined" },
//   "789000",
//   "signup"
// );
dotenv.config({ path: `./config.env` });
const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
// console.log(
//   new Email({ email: "undefined", name: "undefined" }, "789000", "signup")
// );
// console.log("printing", email);
console.log(DB);


mongoose
  .connect(DB)
  .then(() => console.log("DB connection succesful"))
  .catch((err) => console.log(err.message));
app.listen(5000, "127.0.0.1", () => console.log("app is running"));
