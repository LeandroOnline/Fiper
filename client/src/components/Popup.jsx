import "./Popup.css";
import warning from "../assets/advertencia.png";
import ok from "../assets/correcto.png";
import error from "../assets/error.png";
import question from "../assets/pregunta.png";

const Popup = ({ config = { popupConfig: {}, setPopupConfig } }) => {
  const activate = config.popupConfig?.activate ? true : false;

  if (typeof config.popupConfig?.toConfirm === "undefined") {
    setTimeout(() => {
      config.popupConfig
        ? config.setPopupConfig({
            ...config.popupConfig,
            activate: false,
            toConfirm: null,
          })
        : null;
    }, 3000);
  }

  let img =
    config.popupConfig?.type === "error"
      ? error
      : config.popupConfig?.type === "ok"
      ? ok
      : config.popupConfig?.type === "warning"
      ? warning
      : question;

  return (
    <div className={activate ? "pop" : "pup"}>
      <div className="popupBlur"></div>
      <img className="popimg" src={img} alt="img" />
      <p>{config.popupConfig?.text}</p>
      {config.popupConfig?.toConfirm ? (
        <div className="popupButtonsContainer">
          {config.popupConfig?.query ? (
            <button
              className="popupButton"
              onClick={() => {
                config.popupConfig.choise
                  ? config.setPopupConfig({
                      ...config.popupConfig,
                      activate: false,
                      choise: false,
                    })
                  : null;
              }}
            >
              Cancelar
            </button>
          ) : null}
          <button
            className="popupButton"
            onClick={() => {
              config.popupConfig?.choise
                ? config.setPopupConfig({
                    ...config.popupConfig,
                    activate: false,
                    choise: true,
                  })
                : config.setPopupConfig({
                    ...config.popupConfig,
                    activate: false,
                  });
            }}
          >
            Aceptar
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Popup;
