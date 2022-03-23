const mongoose = require("mongoose");
const marked = require("marked");

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

  createdBy: {
    type: String,
    required: true,
  },
  institutionType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Entry", entrySchema);
