const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

class Email {
  constructor(user, otp, method) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.otp = otp;
    this.method = method;
    this.from = "amanshaw2384@gmail.com";
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "MailerSend",
        server: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "20d6160c27490a",
        pass: "b9dd72584a0505",
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      subject: subject,
      otp: this.otp,
      method: this.method,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async welcome() {
    await this.send(
      "welcome",
      `Welcome to Pug Family, Thank you for ${method}`
    );
  }
  async sendOtp() {
    await this.send("sendOtp", `OTP for ${this.method}`);
  }
}
const mail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dfff3ae2abbd6a",
      pass: "e19b79bd99d9a5",
    },
  });

  const mailOptions = {
    from: "amanshaw2384@gmail.com",
    to: options.to,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = Email;
// module.exports = mail;
