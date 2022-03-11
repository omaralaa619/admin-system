const express = require("express");
const User = require("./../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");

router.get("/", async (req, res) => {
  const all = {};
  all.user = await req.user;

  all.users = await User.find().sort({ createdAt: "desc" });
  res.render("users/index", { all: all });
});
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/users");
});
router.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    user = await user.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

module.exports = router;
