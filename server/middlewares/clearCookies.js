const clearCookies = async (req, res, next) => {
  const cookie = req.cookies.user;
  if (cookie) {
    process.env.NODE_ENV === "development"
      ? res.clearCookie("user")
      : res.clearCookie("user", {
          domain: ".savat.ar",
          path: "/",
        });
  } else {
    next();
  }
};

module.exports = clearCookies;
