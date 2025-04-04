// backend/controllers/leaderboardController.js
const User = require("../models/User");

// GET: Leaderboard - Top Donators
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ donatedItems: -1 })
      .limit(10)
      .select("name donatedItems barterCoins");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to load leaderboard", error: err.message });
  }
};

// GET: EcoMeter Stats
exports.getEcoStats = async (req, res) => {
  try {
    const users = await User.find({});
    const totalUsers = users.length;
    const totalItems = users.reduce((sum, user) => sum + user.donatedItems, 0);

    res.json({
      totalUsers,
      totalDonatedItems: totalItems,
      estimatedCarbonSavedKg: totalItems * 2.5 // let's say 1 item = 2.5kg CO₂ saved
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch eco stats", error: err.message });
  }
};
