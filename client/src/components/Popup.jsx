import "./Popup.css";
import warning from "../assets/advertencia.png";
import ok from "../assets/correcto.png";
import error from "../assets/error.png";
import question from "../assets/pregunta.png";

const Popup = ({ config = {} }) => {
  const activate = config.popupConfig?.activate ? true : false;
  const timer = config.popupConfig?.fast ? 1500 : 3000;
  if (typeof config.popupConfig?.toConfirm === "undefined") {
    setTimeout(() => {
      config.popupConfig && config.setPopupConfig
        ? config.setPopupConfig({
            ...config.popupConfig,
            activate: false,
            toConfirm: null,
          })
        : null;
    }, timer);
  }

  let img =
    config.popupConfig?.type === "error"
      ? error
      : config.popupConfig?.type === "ok"
      ? ok
      : config.popupConfig?.type === "warning"
      ? warning
      : config.popupConfig?.type === "query"
      ? question
      : null;

  return (
    <div className={activate ? "pop" : "pup"}>
      <img className="popimg" src={img} alt="img" />
      <p className="popupText">{config.popupConfig?.text}</p>
      {config.popupConfig?.toConfirm ? (
        <div className="popupButtonsContainer">
          <button
            className="popupButtonAcept"
            onClick={() => {
              config.setPopupConfig({
                ...config.popupConfig,
                activate: false,
                choise: config.popupConfig?.query ? true : null,
              });
            }}
          >
            Aceptar
          </button>
          {config.popupConfig?.query ? (
            <button
              className="popupButtonCancel"
              onClick={() => {
                config.setPopupConfig({
                  ...config.popupConfig,
                  activate: false,
                  choise: false,
                });
              }}
            >
              Cancelar
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default Popup;
