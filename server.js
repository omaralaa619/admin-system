if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const User = require("./models/user");
const connectDB = require("./config/db");
const articleRouter = require("./routes/articles");
const usersRouter = require("./routes/users");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const path = require("path");
const app = express();
const port = process.env.PORT;

connectDB();
const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => await User.findOne({ email: email }),
  async (id) => await User.findOne({ _id: id })
);

const users = [
  { name: "omar", email: "omaralaa619@gmsail.com", password: "paa" },
];
app.use(express.static(path.join(__dirname + "/public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", checkAuthenticated, async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.get("/login", checkNotAuthenticated, async (req, res) => {
  const users = await User.find().sort({ name: "desc" });

  res.render("login.ejs", { users: users });
  console.log(users);
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
app.use("/articles", checkAuthenticated, articleRouter);
app.use("/users", checkAuthenticated, usersRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
