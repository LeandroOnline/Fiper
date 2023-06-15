const router = require("express").Router();
const loginValidate = require("../middlewares/loginvalidate");
const verifySyntax = require("../middlewares/verifySyntax");
const Sanitize = require("../middlewares/sanitize");
const delay = require("../middlewares/delay");

// Server
router.get("/test", require("../controllers/test"));

// User
// router.post("/login", delay,verifySyntax, require("../controllers/login"));
router.post("/login",verifySyntax, require("../controllers/login"));
router.post("/addUser", verifySyntax, require("../controllers/addUser"));
router.delete("/deleteUser",loginValidate, require("../controllers/deleteUser"));
router.put("/updatePassword", loginValidate, require("../controllers/updatePassword"));
router.post("/checkVerify", require("../controllers/checkVerify"));
router.post("/sendEmail", require("../controllers/sendEmail"));
router.get("/checkValidate/:id", require("../controllers/checkValidate"));
router.post("/remember", require("../controllers/remember"));

// Inputs
router.post("/addInput", loginValidate, Sanitize, require("../controllers/addInput"));
router.put("/update/:id", loginValidate, Sanitize, require("../controllers/updateInput"));
router.post("/getAllInputs", loginValidate, require("../controllers/getAllInputs"));
router.route("/deleteAllInputs").delete(loginValidate, require("../controllers/deleteAllInputs"));
router.delete("/delete/:id", loginValidate, require("../controllers/deleteItem"));

// Notes
router.post("/getNotes", loginValidate, require("../controllers/getNotes"));
router.post("/addNote", loginValidate, Sanitize, require("../controllers/addNote"));
router.put("/updateNote/:id", loginValidate, Sanitize, require("../controllers/updateNote"));
router.delete("/deleteNote/:id", loginValidate, require("../controllers/deleteNote"));
router.put("/checkNote/:id", loginValidate, require("../controllers/checkNote"));

// Admin
const {
  getusers,
  getAllNotes,
  deleteAllNotes,
  get,
  del,
} = require("../controllers/controllers");
router.route("/getusers").get(getusers);
router.route("/getAllNotes").get(getAllNotes);
router.route("/get").get(get);
router.route("/del").delete(del);
router.route("/deleteAllNotes").delete(deleteAllNotes);

module.exports = router;
