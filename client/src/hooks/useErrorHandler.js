const useErrorHandler = (err) => {
  if (err.code === "ECONNABORTED") {
    return {
      type: "warning",
      text: "Experimentamos sobrecarga, intente nuevamente o pruebe luego",
      activate: true,
      toConfirm: true,
      query: false,
      popupActivate: true,
    };
  } else {
    console.log(err);
    return {
      type: "error",
      text: "Disculpe, estamos en mantenimiento, por favor intente mas tarde",
      activate: true,
      toConfirm: true,
      query: false,
      popupActivate: true,
    };
  }
};

export default useErrorHandler;
