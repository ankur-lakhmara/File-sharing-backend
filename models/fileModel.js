const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  fileName: { type: String, required: true },
  path: { type: String, required: true },
  url: { type: String, required: true },
  // other fields
});

module.exports = mongoose.model("files", FileSchema);
