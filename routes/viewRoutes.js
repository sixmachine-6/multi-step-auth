const viewControllers = require("./../Controllers/viewControllers");
const authControllers = require("./../Controllers/authControllers");
const express = require("express");

const router = express.Router();

router.route("/").get(viewControllers.base);
router.route("/login").get(viewControllers.login);
router.route("/signup").get(viewControllers.signup);
router.route("/otp").get(authControllers.loggedIn, viewControllers.otp);
router
  .route("/thankyou")
  .get(authControllers.otpverified, viewControllers.thankyou);

module.exports = router;
