const useVerify = (email = "", password = "") => {
  let cleanEmail = true;
  let cleanPassword = true;
  if (email !== "") {
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    cleanEmail = validEmailRegex.test(email);
  } else {
    cleanEmail = false;
  }
  if (password !== "") {
    const strongPasswordRegex = /^(?=.*\d)(?=.*[A-Z]).{7,}$/;
    cleanPassword = strongPasswordRegex.test(password);
  } else {
    cleanPassword = false;
  }
  return cleanEmail && cleanPassword;
};

export default useVerify;
