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
    res.status(400).send("Error in verifySyntax middleware");
  }
};

module.exports= verifySyntax;
