const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "your password is not same",
    },
  },
  otp: {
    type: String,
  },
  otpGeneratedAt: {
    type: Date,
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};
userSchema.methods.checkOtp = function (otp, userOtp) {
  console.log(otp, userOtp);
  console.log(otp === userOtp);
  return otp === userOtp;
};
userSchema.methods.changedPassword = function (JWTTimestamp) {
  console.log(this.passwordChangedAt);
  const date = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  console.log(date);
  if (this.passwordChangedAt) {
    return JWTTimestamp < date;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
