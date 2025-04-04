// backend/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  weightage: {
    type: Number,
    default: 1, // used for price inflation model later
  },
  barterCoins: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
