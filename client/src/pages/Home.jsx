import AreaGraph from "../components/AreaGraph";
import ColumnGraph from "../components/ColumnGraph";
import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import Total from "../components/Total";
import useGlobalStore from "../store/Store";
import DolarBlue from "../components/DolarBlue";
import Interest from "../components/Interest";
import ProfitsAndLosses from "../components/ProfitsAndLosses";
import NoLogged from "../components/NoLogged";
import "./Home.css";
import Verify from "./Verify";
import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import Notes from "../components/Notes";
import PorcentComponent from "../components/PorcentComponent";
import Time from "../components/Time";

const Home = () => {
  const login = useGlobalStore((state) => state.login);
  const checkVerify = useGlobalStore((state) => state.checkVerify);
  const verifyMessage = useGlobalStore((state) => state.verifyMessage);
  const emailStore = useGlobalStore((state) => state.emailStore);
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
    <div className="all">
      <div className="homecontainer">
        <Popup config={popupConfig} />
        {verifyCheckMessage()}
        {login ? (
          checkVerify ? (
            <>
              <div className="tinys">
                <ProfitsAndLosses />
                <DolarBlue />
                <Time />
              </div>
              <div className="inputsGraph">
                <div className="inputTotal">
                  <Input />
                  <PorcentComponent />
                </div>
                <ListInputs />
              </div>
              <Total />
              <Interest />
              <Notes />
              <div className="graphs">
                <ColumnGraph />
                <AreaGraph />
              </div>
            </>
          ) : (
            <Verify />
          )
        ) : (
          <NoLogged />
        )}
      </div>
    </div>
  );
};
export default Home;
