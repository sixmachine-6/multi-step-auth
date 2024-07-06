exports.base = (req, res) => {
  console.log("logging!!!");
  res.status(200).render("base");
};

exports.login = (req, res) => {
  res.status(200).render("login");
};

exports.signup = (req, res) => {
  res.status(200).render("signup");
};

exports.otp = (req, res) => {
  res.status(200).render("otp");
};

exports.thankyou = (req, res) => {
  res.status(200).render("thankyou");
};
