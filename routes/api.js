const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();

router.get("/", async (req, res) => {
  const entries = await Entry.find().sort({
    createdAt: "desc",
  });

  res.json(entries);
});
router.get("/:id", async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.status(400).json({ message: "Entry not found" });
  }
});

module.exports = router;
