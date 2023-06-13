import API from "./apiUrl";
import axios from "axios";

const remember = async (email) => {
  return await axios
    .post(API + "/remember", {
      email: email,
    })
    .then((data) => data.data)
    .catch((err) => err);
};
export default remember;
