import API from "./apiUrl";
import axios from "axios";

const axiosSendEmail = async () => {
  await axios.post(API + "/sendEmail", {
    token: sessionStorage.getItem("user"),
  });
};
export default axiosSendEmail;
