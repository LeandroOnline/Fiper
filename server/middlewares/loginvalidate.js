const jwt = require("jsonwebtoken");

const loginvalidate = async (req, res, next) => {
  const token = await req.cookies.user;

  if (token) {
    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    next();
  } else {
    res.status(500).send("No Token - loginvalidate");
  }
};

module.exports = loginvalidate;
