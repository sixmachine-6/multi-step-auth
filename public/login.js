import axios from "axios";
import { error } from "./error";
export async function login(email, password) {
  try {
    error(
      "please wait!!! sending the otp to email...This might take few seconds Be Patient!!!",
      "correct"
    );
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      console.log(res);
      window.location.href = "/otp";
    }
  } catch (err) {
    console.log(err);
    error(err.response.data.message, "wrong");
  }
}
