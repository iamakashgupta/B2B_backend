const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // This is username
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  barterCoins: { type: Number, default: 0 },
  claimedItems: { type: Number, default: 0 },
  ecoPoints: { type: Number, default: 0 },       // ➕ Add this
  tradeCount: { type: Number, default: 0 },      // ➕ Add this
});

module.exports = mongoose.model("User", userSchema);
