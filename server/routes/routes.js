const router = require("express").Router();

const {
  add,
  getall,
  update,
  deleteItem,
  deleteall,
} = require("../controllers/controllers");

router.route("/add").post(add); // add inputs
router.route("/update/:id").put(update); // add inputs
router.route("/getall").get(getall); // get all = negative+positive from DB
router.route("/deleteall").delete(deleteall); // delete all the data base
router.route("/delete/:id").delete(deleteItem); // delete item

module.exports = router;
