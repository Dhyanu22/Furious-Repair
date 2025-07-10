const mongoose = require("mongoose");

const repairerSchema = new mongoose.Schema({
  name: String,
  expertise: [String],
  available: { type: Boolean, default: true },
  phone: String,
});

module.exports = mongoose.model("Repairer", repairerSchema);
