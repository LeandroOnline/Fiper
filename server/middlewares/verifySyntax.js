const verifySyntax = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

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
  if (cleanEmail && cleanPassword) {
    next();
  } else {
    res.status(400).send("Hacking, adding your ip to the watch list, if this is an error ignore the message");
  }
};

module.exports= verifySyntax;