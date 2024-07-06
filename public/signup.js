import axios from "axios";
import { error } from "./error";
export const signup = async (name, email, password, confirmPassword) => {
  try {
    error(
      "please wait!!! sending the otp to email...This might take few seconds Be Patient!!!",
      "correct"
    );
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    });

    console.log(res);
    if (res.data.status === "success") {
      window.location.href = "/otp";
    }
  } catch (err) {
    console.log(err);
    console.log(err.message);
    error(err.message);
  }
};
