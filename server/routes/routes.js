const router = require("express").Router();

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
} = require("../controllers/controllers");

router.route("/add").post(add); // add inputs
router.route("/adduser").post(adduser); // add inputs
router.route("/login").post(login); // add inputs
router.route("/update/:id").put(update); // add inputs
router.route("/getall").get(getall); // get all = negative+positive from Inputs
router.route("/getusers").get(getusers); // get users
router.route("/deleteall").delete(deleteall); // delete all the data base
router.route("/delete/:id").delete(deleteItem); // delete item
router.route("/deleteuser").delete(deleteUser); // delete item

module.exports = router;
