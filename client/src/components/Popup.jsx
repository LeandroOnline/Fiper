import "./Popup.css";
import warning from "../assets/advertencia.png";
import ok from "../assets/correcto.png";
import error from "../assets/error.png";
import question from "../assets/pregunta.png";

const Popup = ({ text, type, popupActivate, onConfirm, toConfirm, timer }) => {
  if (timer && popupActivate) {
    setTimeout(() => {
      onConfirm(false);
    }, timer);
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
      <img className="popimg" src={img} alt="img" />
      <p>{text}</p>
      {toConfirm ? (
        <div className="popupButtonsContainer">
          <button className="popupButton" onClick={() => onConfirm(false)}>
            Cancelar
          </button>
          <button className="popupButton" onClick={() => onConfirm(false)}>
            Aceptar
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Popup;
