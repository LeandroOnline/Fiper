import API from "./apiUrl";
import axios from "axios";

const axiosSendEmail = async (email) =>
  await axios
    .post(
      API + "/sendEmail",
      {
        email: email,
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default axiosSendEmail;
