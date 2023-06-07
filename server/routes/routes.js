const router = require("express").Router();
const loginValidate = require("../middlewares/loginvalidate");

const {
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
router.post("/addInput", loginValidate, Sanitize, require("../controllers/addInput"));
router.post("/addUser", verifySyntax, require("../controllers/addUser"));
router.post("/login", verifySyntax, require("../controllers/login"));
router.put("/update/:id", loginValidate, Sanitize, require("../controllers/updateInput"));
router.post("/getAllInputs", loginValidate, require("../controllers/getAllInputs"));
router.route("/deleteAllInputs").delete(loginValidate, require("../controllers/deleteAllInputs"));
router.delete("/delete/:id", loginValidate, require("../controllers/deleteItem"));
router.delete("/deleteUser",loginValidate, require("../controllers/deleteUser"));

// deben tener permisos de administrador
// router.route("/getusers").get(getusers);
// router.route("/get").get(get);
// router.route("/del").delete(del);

module.exports = router;
