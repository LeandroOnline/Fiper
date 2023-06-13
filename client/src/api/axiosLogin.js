import API from "./apiUrl";
import axios from "axios";

const login = async (email, password) =>
  await axios
    .post(API + "/login", {
      email: email,
      password: password,
    })
    .then((data) =>
      data.data.status
        ? data.data.status === "Logged"
          ? data.data.token
          : data.data.status === "Incorrect pasword"
          ? "Incorrect pasword"
          : data.data.status === "User not found"
          ? "User not found"
          : console.log(data.data.status)
        : data.data
    )
    .catch((err) => {
      console.log(err);
      return "error";
    });

export default login;
