import API from "./apiUrl";
import axios from "axios";

const axiosSendEmail = async (email) => {
  await axios.post(API + "/sendEmail", {
    email: email,
  });
};
export default axiosSendEmail;
