const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();

router.get("/", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: "desc" });

  res.render("search/index", { entries: entries });
});

module.exports = router;
