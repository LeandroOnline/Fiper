const useVerify = (email = "", password = "") => {
  let cleanEmail = true;
  let cleanPassword = true;
  if (email !== "") {
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    cleanEmail = validEmailRegex.test(email);
  }else{
    cleanEmail = false;
  }
  if (password ? password !== "" : false) {
    const strongPasswordRegex = /^(?=.*\d)(?=.*[A-Z]).{7,}$/;
    cleanPassword = strongPasswordRegex.test(password);
  }
  return cleanEmail && cleanPassword;
};

export default useVerify;

// useVerify devuelve true cuando el email y el password son correctos a la vez
