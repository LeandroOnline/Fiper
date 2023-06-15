const Sanitize = (req, res, next) => {
  const tipo = req.body.tipo ? req.body.tipo : "";
  const input = req.body.input ? req.body.input : "";
  const detalle = req.body.detalle ? req.body.detalle : "";
  const title = req.body.title ? req.body.title : "";
  const text = req.body.text ? req.body.text : "";

  const sanitizeTipo = tipo.replace(/<(?:.|\n)*?>/gm, "");
  const sanitizeInput = input.replace(/<(?:.|\n)*?>/gm, "");
  const sanitizeDetalle = detalle.replace(/<(?:.|\n)*?>/gm, "");
  const sanitizeTitle = title.replace(/<(?:.|\n)*?>/gm, "");
  const sanitizeText = text.replace(/<(?:.|\n)*?>/gm, "");

  req.body.tipo ? (req.body.tipo = sanitizeTipo) : null;
  req.body.input ? (req.body.input = sanitizeInput) : null;
  req.body.detalle ? (req.body.detalle = sanitizeDetalle) : null;
  req.body.title ? (req.body.title = sanitizeTitle) : null;
  req.body.text ? (req.body.text = sanitizeText) : null;

  next();
};

module.exports = Sanitize;
