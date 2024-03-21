const verifySyntax = (req, res, next) => {
  const email = req.body.email;

  let cleanEmail = false;

  if (email !== "") {
    const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    cleanEmail = validEmailRegex.test(email);
  }
  if (cleanEmail) {
    next();
  } else {
    res.status(400).send("Error in verifySyntax middleware");
  }
};

module.exports= verifySyntax;
