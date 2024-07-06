import { checkOtp } from "./otp";
import { signup } from "./signup";
import { login } from "./login";
const formContainer = document.querySelector(".form--signup");
const otpForm = document.querySelector(".otpform");
const loginForm = document.querySelector(".login--form");

if (formContainer) {
  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    signup(name, email, password, confirmPassword);
    console.log(name, email, password, confirmPassword);
  });
}
// console.log(formContainer);
if (otpForm) {
  otpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const otp = document.getElementById("otp").value;
    checkOtp(otp);
  });
  console.log("aman");
  console.log(otpForm);
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}
