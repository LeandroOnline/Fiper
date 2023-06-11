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
import { useState } from "react";
import Popup from "../components/Popup";

const Home = () => {
  const login = useGlobalStore((state) => state.login);
  const checkVerify = useGlobalStore((state) => state.checkVerify);
  const verifyMessage = useGlobalStore((state) => state.verifyMessage);
  const setVerifyMessageDone = useGlobalStore(
    (state) => state.setVerifyMessageDone
  );

  const [popupActivate, setPopupActivate] = useState(false);
  const [popupChoise, setPopupChoise] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    type: "ok",
    text: "popupText",
    toConfirm: true,
    query: false,
  });

  const verifyCheckMessage = () => {
    if (verifyMessage) {
      setTimeout(() => {
        setPopupConfig({
          type: "ok",
          text: "Cuenta Verificada",
          toConfirm: false,
          query: false,
        });
        setPopupActivate(true);
        setVerifyMessageDone();
      }, 2000);
    }
  };

  return (
    <div className="homecontainer">
      {verifyCheckMessage()}
      {login ? (
        checkVerify ? (
          <>
            <div className="inputsGraph">
              <div className="inputTotal">
                <Input />
                <Total />
              </div>

              <div className="graphs">
                <ColumnGraph />
                <AreaGraph />
              </div>
            </div>
            <div className="tinys">
              <ProfitsAndLosses />
              <DolarBlue />
              <Interest />
            </div>
            <ListInputs />
            <Popup
              popupActivate={popupActivate}
              setPopupActivate={() => setPopupActivate(false)}
              choise={setPopupChoise}
              type={popupConfig.type}
              text={popupConfig.text}
              toConfirm={popupConfig.toConfirm}
              query={popupConfig.query}
            />
          </>
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
