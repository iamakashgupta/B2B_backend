const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ barterCoins: -1 })
      .limit(10)
      .select('username barterCoins');

    res.json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

module.exports = router;
