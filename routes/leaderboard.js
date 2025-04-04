const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const leaderboard = await Promise.all(users.map(async (user) => {
      const claimedItems = await Item.countDocuments({ claimedBy: user._id });
      return { username: user.username, claimedItems };
    }));

    leaderboard.sort((a, b) => b.claimedItems - a.claimedItems);
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
