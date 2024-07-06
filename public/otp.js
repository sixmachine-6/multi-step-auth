import axios from "axios";
import { error } from "./error";
export const checkOtp = async (otp) => {
  try {
    console.log(otp);
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/v1/users/checkOtp",
      data: {
        otp,
      },
    });

    if (res.status === 200) {
      error("logged in successfully", "correct");
      window.setTimeout(() => {
        location.assign("/thankyou");
        console.log(res);
      }, 1000);
    }
    // if (res.data === "invalid otp") error("enter correct otp", "wrong");
    // console.log(res);
  } catch (err) {
    console.log(err);
    error(err.response.data.message, "wrong");
  }
};
