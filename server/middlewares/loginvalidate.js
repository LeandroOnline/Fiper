const loginvalidate = (req, res, next) => {
  const token = req.cookies.user;
  if (token) {
    next();
  } else {
    res.status(500).send("No Token");
  }
};

module.exports = loginvalidate;