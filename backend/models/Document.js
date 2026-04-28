const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  data: Object,
  title: { type: String, default: "Untitled Document" }
}, { timestamps: true });

module.exports = model("Document", Document);
