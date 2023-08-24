const express = require("express");
const { UserModel } = require("../Models/user.model");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.json({ msg: "Error" });
      }

      const user = new UserModel({ email, password: hash, username });
      await user.save();
      return res.json({ msg: "User registered successfully" });
    });
  } catch (error) {
    return res.json({ msg: "Error" });
  }
});

route.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ msg: "Wrong credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ msg: "Error" });
      }

      if (result) {
        const token = jwt.sign(
          { userId: user._id, email: user.email, username: user.username },
          "harshi"
        );
        return res.json({ msg: "Login successful", token: token });
      } else {
        return res.json({ msg: "Wrong credentials" });
      }
    });
  } catch (error) {
    return res.json({ msg: "Error" });
  }
});

module.exports = {
  route,
};
