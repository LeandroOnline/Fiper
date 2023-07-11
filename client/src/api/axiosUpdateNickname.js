import API from "./apiUrl";
import axios from "axios";

const updateNickname = async (nickname) =>
  await axios
    .put(
      API + "/updateNickname",
      {
        nickname: nickname,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 8000 }
    )
    .then((data) => data.data);

export default updateNickname;
