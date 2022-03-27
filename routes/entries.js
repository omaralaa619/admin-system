const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { entry: new Entry() });
});

router.get("/edit/:id", async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  res.render("articles/edit", { entry: entry });
});

router.get("/:id", async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (entry == null) res.redirect("/");
  res.render("articles/show", { entry: entry });
});

router.post(
  "/",
  async (req, res, next) => {
    req.entry = new Entry();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.entry = await Entry.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    const createdBy = await req.user;
    let entry = req.entry;
    entry.institution = req.body.institution;
    entry.field = req.body.field;
    entry.number = req.body.number;
    entry.adress = req.body.adress;
    entry.email = req.body.email;
    entry.website = req.body.website;
    entry.institutionType = req.body.institutionType;
    entry.stratigicPlan = req.body.stratigicPlan;
    entry.demands = req.body.demands;
    entry.supportType = req.body.supportType;
    entry.orderTime = req.body.orderTime;
    entry.communicationType = req.body.communicationType;
    entry.intrestedAswan = req.body.intrestedAswan;
    entry.createdBy = createdBy.name;

    try {
      entry = await entry.save();
      res.redirect(`/entries/${entry.id}`);
    } catch (e) {
      res.render(`entries/${path}`, { entry: entry });
      console.log(e);
    }
  };
}

module.exports = router;
