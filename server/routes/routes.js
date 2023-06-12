const router = require("express").Router();
const loginValidate = require("../middlewares/loginvalidate");

const {
  getusers,
  get,
  del,
} = require("../controllers/controllers");
const verifySyntax = require("../middlewares/verifySyntax");
const Sanitize = require("../middlewares/sanitize");

router.post("/addInput", loginValidate, Sanitize, require("../controllers/addInput"));
router.post("/addUser", verifySyntax, require("../controllers/addUser"));
router.post("/login", verifySyntax, require("../controllers/login"));
router.put("/update/:id", loginValidate, Sanitize, require("../controllers/updateInput"));
router.post("/getAllInputs", loginValidate, require("../controllers/getAllInputs"));
router.route("/deleteAllInputs").delete(loginValidate, require("../controllers/deleteAllInputs"));
router.delete("/delete/:id", loginValidate, require("../controllers/deleteItem"));
router.delete("/deleteUser",loginValidate, require("../controllers/deleteUser"));
router.put("/updatePassword", loginValidate, require("../controllers/updatePassword"));
router.post("/checkVerify", require("../controllers/checkVerify"));
router.post("/sendEmail", require("../controllers/sendEmail"));
router.get("/checkValidate/:id", require("../controllers/checkValidate"));
router.get("/test", require("../controllers/test"));

// deben tener permisos de administrador
router.route("/getusers").get(getusers);
router.route("/get").get(get);
router.route("/del").delete(del);

module.exports = router;
