const express = require("express");
const User = require("./../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");

router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: "desc" });
  res.render("users/index", { users: users });
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
    email: req.body.email,
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
