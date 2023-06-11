import "./Popup.css";
import warning from "../assets/advertencia.png";
import ok from "../assets/correcto.png";
import error from "../assets/error.png";
import question from "../assets/pregunta.png";

const Popup = ({
  text,
  type,
  popupActivate,
  setPopupActivate,
  choise,
  toConfirm,
  query,
}) => {
  if (!toConfirm && popupActivate) {
    setTimeout(() => {
      setPopupActivate();
    }, 3000);
  }

  let img =
    type === "error"
      ? error
      : type === "ok"
      ? ok
      : type === "warning"
      ? warning
      : question;

  return (
    <div className={popupActivate ? "pop" : "pup"}>
      <div className="popupBlur"></div>
      <img className="popimg" src={img} alt="img" />
      <p>{text}</p>
      {toConfirm ? (
        <div className="popupButtonsContainer">
          {query ? (
            <button
              className="popupButton"
              onClick={() => {
                choise(false);
                setPopupActivate();
              }}
            >
              Cancelar
            </button>
          ) : null}
          <button
            className="popupButton"
            onClick={() => {
              choise(true);
              setPopupActivate();
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
