import API from "./apiUrl";
import axios from "axios";

const remember = async (email) =>
  await axios
    .post(
      API + "/remember",
      {
        email: email,
      },
      { timeout: 8000 }
    )
    .then((data) => data.data);

export default remember;
