import "./Popup.css";

const Popup = ({ text, popupOpenClose, onConfirm, toConfirm, timer }) => {
  if (timer && popupOpenClose) {
    const timerToClose = setTimeout(() => {
      onConfirm(false);
    }, timer);
  }

  return (
    <div className={popupOpenClose ? "pop" : "pup"}>
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
