const Sanitize = (req, res, next) => {
  const input = req.body.input;

  const sanitize = input.replace(/<(?:.|\n)*?>/gm, "");

  req.body.input = sanitize;
  
  next();
};

module.exports = Sanitize;
