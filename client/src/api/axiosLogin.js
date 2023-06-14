import API from "./apiUrl";
import axios from "axios";

const login = async (email, password) =>
  await axios
    .post(
      API + "/login",
      {
        email: email,
        password: password,
      },
      { timeout: 6000 }
    )
    .then((data) =>
      data.data.status === "Logged" ? data.data.token : data.data.status
    );

export default login;
