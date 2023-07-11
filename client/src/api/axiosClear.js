import API from "./apiUrl";
import axios from "axios";

const clear = async () =>
  await axios
    .delete(API + "/deleteAllInputs", {
      data: {
        token: sessionStorage.getItem("user"),
      },
      timeout: 8000,
    })
    .then((data) => data.data)
    
export default clear;
