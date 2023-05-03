const router = require("express").Router();
const loginValidate = require("../middlewares/loginvalidate");
const clearCookies = require("../middlewares/clearCookies");

const {
  add,
  adduser,
  login,
  getall,
  getusers,
  update,
  deleteItem,
  deleteall,
  deleteUser,
  logout,
} = require("../controllers/controllers");
const { default: verifySyntax } = require("../middlewares/verifySyntax");

router.route("/add").post(loginValidate, add);
router.route("/adduser").post(verifySyntax, adduser);
router.route("/login").post(clearCookies, verifySyntax, login);
router.route("/logout").get(logout);
router.route("/update/:id").put(loginValidate, update);
router.route("/getall").get(loginValidate, getall);
router.route("/getusers").get(getusers);
router.route("/deleteall").delete(loginValidate, deleteall);
router.route("/delete/:id").delete(loginValidate, deleteItem);
router.route("/deleteuser").delete(loginValidate, deleteUser);

module.exports = router;
