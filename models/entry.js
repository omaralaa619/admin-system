const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const entrySchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
  },
  number: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  institutionType: {
    type: String,
    required: true,
  },
});

entrySchema.pre("validate", function (next) {
  if (this.institution) {
    this.slug = slugify(this.institution, { lower: true, strict: true });
  }

  next();
});

module.exports = mongoose.model("Entry", entrySchema);
