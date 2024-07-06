const express = require("express");
const authControllers = require("./../Controllers/authControllers");
const viewControllers = require("./../Controllers/viewControllers");
const router = express.Router();
console.log(authControllers);
router.route("/signup").post(authControllers.signup);
router.route("/login").post(authControllers.login);
router.route("/checkOtp").post(authControllers.checkOtp);

module.exports = router;
