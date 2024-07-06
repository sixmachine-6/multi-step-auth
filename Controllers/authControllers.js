const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/userModel");
const Email = require("./../utils/email");
const mail = require("./../utils/email");
const crypto = require("crypto");

const randomCode = () => {
  return crypto.randomInt(101929, 987678);
};
// function error(error) {
//   const markup = `<div class="error">${error}</div>`;
//   document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
// }

async function emailAndOtpGeneration(user, res, method) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  console.log(token);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  user.password = undefined;
  const otp = String(randomCode());
  console.log(otp);
  console.log(typeof otp);
  user.otp = otp;
  console.log("a a ");
  user.otpGeneratedAt = Date.now();
  // await user.save({ validateBeforeSave: false });
  await User.findByIdAndUpdate(
    { _id: user.id },
    { otp, otpGeneratedAt: Date.now() },
    { new: true, runValidators: true }
  );
  try {
    // await mail({
    //   to: user.email,
    //   message: otp,
    // });
    // await new Email(user, otp, method).welcome();
    await new Email(user, otp, method).sendOtp();
    console.log(await new Email(user, otp, method));
  } catch (err) {
    console.log(err.message);
  }
  res
    .cookie("jwt", token, cookieOptions)
    .status(201)
    .json({
      status: "success",
      data: {
        user,
        token: token,
      },
    });
}
exports.signup = async (req, res) => {
  try {
    // error("loading");
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    // console.log(user._id);
    emailAndOtpGeneration(user, res, "signup");
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).json({
        status: "fail",
        message: "please provide email or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !(await user.checkPassword(password, user.password))) {
      res.status(401).json({
        status: "failed",
        message: "user does not exist with given email",
      });
    }
    //function
    emailAndOtpGeneration(user, res, "login");
  } catch (err) {
    console.log(err.message);
  }
};

exports.loggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      console.log(req.cookies.jwt);

      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      const user = await User.findById({ _id: decoded.id });
      console.log(user);
      if (!user) return next();
      // if (UIEventser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }
      req.user = user;
      res.locals.user = user;
      console.log("printed me ", res.locals.user);
      return next();
    } catch (err) {
      console.log(err.message);
      return next();
    }
  }
  next();
};

exports.checkOtp = async (req, res, next) => {
  try {
    // if (!req.cookies.jwt || req.headers.authorization) {
    //   return next();
    // }
    console.log(req.body);
    const otp = req.body.otp;
    console.log(typeof otp);
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const user = await User.findById({ _id: decoded.id });
    console.log(user);
    if (!user) {
      return;
    }

    if (!user.checkOtp(otp, user.otp)) {
      res.status(400).json({ message: "invalid otp" });
    }
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.otpverified = (req, res, next) => {
  if (!req.cookies.jwt) res.redirect("/");
  console.log("aman");

  // res.send("aman");

  next();
};
