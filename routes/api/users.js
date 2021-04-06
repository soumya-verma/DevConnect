const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/Users");

// register users
router.post(
  "/",
  [
    check("name", "Enter a name").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password should contain atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      // check if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return jsonwebtoken
      const token = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        token,
        config.get("jwtToken"),
        { expiresIn: 360000 },
        (err, tokenn) => {
          if (err) throw err;
          res.json({ tokenn });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
