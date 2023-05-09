const useVerify = (email = "", password = "") => {
  let cleanEmail = false;
  let cleanPassword = false;
  if (email !== "") {
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    cleanEmail = validEmailRegex.test(email);
  }
  if (password !== "") {
    const strongPasswordRegex = /^(?=.*\d)(?=.*[A-Z]).{7,}$/;
    cleanPassword = strongPasswordRegex.test(password);
  }
  return cleanEmail && cleanPassword;
};

export default useVerify;

// useVerify devuelve true cuando el email y el password son correctos a la vez
