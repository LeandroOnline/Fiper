import API from "./apiUrl";
import axios from "axios";

const apiTest = async (e) => {
  const apiTest = await axios
    .get(API + "/test")
    .then(() => "Working")
    .catch(() => "NotWorking");
  return apiTest;
};

export default apiTest;
