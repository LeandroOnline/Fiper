const Sanitize = (req, res, next) => {

  const tipo = req.body.tipo;
  const input = req.body.input;
  const detalle = req.body.detalle;

  const sanitizeTipo = tipo.replace(/<(?:.|\n)*?>/gm, "");
  const sanitizeInput = input.replace(/<(?:.|\n)*?>/gm, "");
  const sanitizeDetalle = detalle.replace(/<(?:.|\n)*?>/gm, "");

  req.body.tipo = sanitizeTipo;
  req.body.input = sanitizeInput;
  req.body.detalle = sanitizeDetalle;

  next();
};

module.exports = Sanitize;
