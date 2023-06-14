const useErrorHandler = (err) => {
  if (err.code === "ECONNABORTED") {
    return {
      type: "warning",
      text: "Estamos en sobrecarga, por favor regrese luego",
      activate: true,
      toConfirm: true,
      query: false,
      popupActivate: true,
    };
  } else {
    console.log(err);
    return {
      type: "error",
      text: "Estamos en mantenimiento, por favor regrese luego",
      activate: true,
      toConfirm: true,
      query: false,
      popupActivate: true,
    };
  }
};

export default useErrorHandler;
