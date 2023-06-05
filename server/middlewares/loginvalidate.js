const jwt = require("jsonwebtoken");

const loginvalidate = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    if (id) {
      next();
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = loginvalidate;
