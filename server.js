if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const Entry = require("./models/entry");
const User = require("./models/user");
const connectDB = require("./config/db");
const entryRouter = require("./routes/entries");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const searchRouter = require("./routes/search");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

connectDB();
const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (username) => await User.findOne({ username: username }),
  async (id) => await User.findOne({ _id: id })
);

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
app.use(
  cors({
    origin: "https://fancy-monstera-ac53ea.netlify.app",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/test", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const entries = await Entry.find().sort({ createdAt: "desc" });
  const all = {};
  all.user = user;
  all.entries = entries;
  console.log(entries);
  res.render("test", { all: all });
});

app.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const entries = await Entry.find().sort({ createdAt: "desc" });
  const all = {};
  all.user = user;
  all.entries = entries;
  console.log(all.entries);

  res.render("articles/index", { all: all });
});

app.get("/login", checkNotAuthenticated, async (req, res) => {
  const users = await User.find().sort({ name: "desc" });

  res.render("login.ejs", { users: users });
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
app.use("/entries", checkAuthenticated, entryRouter);
app.use("/users", checkAuthenticated, usersRouter);
app.use("/api", checkNotAuthenticated, apiRouter);
app.use("/search", checkNotAuthenticated, searchRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
