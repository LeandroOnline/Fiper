import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import ProfitAndLoss from "../components/ProfitAndLoss";
import useGlobalStore from "../store/Store";
import Interest from "../components/Interest";
import NoLogged from "../components/NoLogged";
import "./Home.css";
import Verify from "./Verify";
import { useState } from "react";
import Popup from "../components/Popup";
import Notes from "../components/Notes";
import Menu from "../components/Menu";
import Graphs from "../components/Graphs";
import Divide from "../components/Divide";

const Home = () => {
  const login = useGlobalStore((state) => state.login);
  const checkVerify = useGlobalStore((state) => state.checkVerify);
  const verifyMessage = useGlobalStore((state) => state.verifyMessage);
  const setVerifyMessageDone = useGlobalStore(
    (state) => state.setVerifyMessageDone
  );

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  const verifyCheckMessage = () => {
    if (verifyMessage) {
      setTimeout(() => {
        setPopupConfig({
          type: "ok",
          text: "Cuenta verificada",
          activate: true,
        });
        setVerifyMessageDone();
      }, 1000);
    }
  };

  return (
    <div className="allScreen">
      <Popup config={popupConfig} />
      {verifyCheckMessage()}
      {login ? (
        checkVerify ? (
          <div className="row">
            <Menu />
            <div className="homecontainer">
              <ProfitAndLoss />
              <div className="inputContainer">
                <Input />
                <ListInputs />
              </div>
              <Notes />
              <Interest />
              <Graphs />
              {/* <Divide /> */}
            </div>
          </div>
        ) : (
          <Verify />
        )
      ) : (
        <NoLogged />
      )}
    </div>
  );
};
export default Home;
