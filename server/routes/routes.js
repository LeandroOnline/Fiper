const router = require("express").Router();
const loginValidate = require("../middlewares/loginvalidate");

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

router.route("/add").post(loginValidate, add); // add inputs
router.route("/adduser").post(adduser); // add inputs
router.route("/login").post(login); // add inputs
router.route("/logout").get(logout); // add inputs
router.route("/update/:id").put(loginValidate, update); // add inputs
router.route("/getall").get(loginValidate, getall); // get all = negative+positive from Inputs
router.route("/getusers").get(getusers); // get users
router.route("/deleteall").delete(loginValidate, deleteall); // delete all the data base
router.route("/delete/:id").delete(loginValidate, deleteItem); // delete item
router.route("/deleteuser").delete(loginValidate, deleteUser); // delete item

module.exports = router;
