const delay = (req, res, next) => {
  try {
    setTimeout(() => {
      next();
    }, 7000);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = delay;
