const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ ecoPoints: -1, tradeCount: -1 })
      .limit(10)
      .select('username ecoPoints tradeCount');
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

module.exports = router;