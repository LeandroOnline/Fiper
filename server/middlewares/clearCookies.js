const clearCookies = async (req, res, next) => {
  const cookie = req.cookies.user;
  if (cookie) {
    process.env.NODE_ENV === "development"
      ? res.clearCookie("user")
      : res.clearCookie("user", {
        maxAge: 86400000,
        secure: true,
        domain: ".savat.ar",
        sameSite: "none",
        path: "/",
        });
  } else {
    next();
  }
};

module.exports = clearCookies;
