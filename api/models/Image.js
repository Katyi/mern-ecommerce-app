
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const ImageSchema = new mongoose.Schema(
  {
    filename: {type: String},
    path: {type: String}
  },
  {timestamps: true}
);

module.exports = mongoose.model("Image", ImageSchema);