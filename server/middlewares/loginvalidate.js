const jwt = require("jsonwebtoken");

const loginvalidate = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    if (id) {
      next();
    } else {
      res.status(500).send("Usuario no autorizado");
    }
  } catch (err) {
    res.status(500).send("Error in login validate: " + err);
  }
};

module.exports = loginvalidate;
