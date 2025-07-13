const mongoose = require("mongoose");

const repairerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  expertise: [String],
  available: { type: Boolean, default: true },
  phone: String,
  isRepairer: { type: Boolean, default: true },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }], // <-- Add this field
});

module.exports = mongoose.model("Repairer", repairerSchema);
