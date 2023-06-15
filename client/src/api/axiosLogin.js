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
    .then((data) => data.data);

export default login;
