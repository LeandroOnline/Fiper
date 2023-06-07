const router = require("express").Router();
const loginValidate = require("../middlewares/loginvalidate");

const {
  login,
  getall,
  update,
  deleteItem,
  deleteall,
  deleteUser,
  getusers,
  get,
  del,
} = require("../controllers/controllers");
const verifySyntax = require("../middlewares/verifySyntax");
const Sanitize = require("../middlewares/sanitize");

// router.route("/add").post(loginValidate, Sanitize, require("../controllers/add.js"));
router.post(
  "/addInput",
  loginValidate,
  Sanitize,
  require("../controllers/addInput")
);
router.post("/addUser", verifySyntax, require("../controllers/addUser"));
router.post("/login", verifySyntax, require("../controllers/login"));
router.put("/update/:id", loginValidate, Sanitize, require("../controllers/updateInput"));
router.route("/getall").post(loginValidate, getall);
router.route("/deleteall").delete(loginValidate, deleteall);
router.route("/delete/:id").delete(loginValidate, deleteItem);
router.route("/deleteuser").delete(loginValidate, deleteUser);

// deben tener permisos de administrador
// router.route("/getusers").get(getusers);
// router.route("/get").get(get);
// router.route("/del").delete(del);

module.exports = router;
