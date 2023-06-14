//-------------------------------------------------------
// Import
import Popup from "";
import { useState } from "react";
import useErrorHandler from "";

//-------------------------------------------------------
// State
const [popupConfig, setPopupConfig] = useState({toConfirm: true});

//-------------------------------------------------------
// For running
setPopupConfig({
  type: "error",
  text: "Lo sentimos, estamos realizando mantenimiento",
  activate: true,
  // --->
  toConfirm: true,
  query: true,
  choise: null,
  // <--- only if is necessary
});

//-------------------------------------------------------
// For show
<Popup config={{ popupConfig, setPopupConfig }} />

//-------------------------------------------------------
// For Errors Handlers
// .catch((err) => setPopupConfig(useErrorHandler(err)));

//-------------------------------------------------------
// Hook
const useErrorHandler = (err) => {
  if (err.code === "ECONNABORTED") {
    return {
      type: "warning",
      text: "Estamos experimentando alta demanda, por favor regresa luego",
      toConfirm: true,
      popupActivate: true,
    };
  } else {
    console.log(err);
    return {
      type: "error",
      text: "Lo sentimos, estamos en mantenimiento del servidor, por favor regrese luego",
      toConfirm: true,
      popupActivate: true,
    };
  }
};
//export default useErrorHandler;
