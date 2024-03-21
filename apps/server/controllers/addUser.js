const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const addUser = async (req, res) => {
    try {
      const exist = await User.findOne({ email: req.body.email });
      if (exist) {
        res.send("Existing user");
      } else {
        const randomKey = await bcryptjs.genSalt();
        const passwordCrypt = bcryptjs.hashSync(req.body.password, randomKey);
  
        const newuser = new User({
          email: req.body.email,
          password: passwordCrypt,
        });
  
        await newuser.save();
        res.send("Added user");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = addUser;