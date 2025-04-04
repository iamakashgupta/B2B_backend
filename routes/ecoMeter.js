// filepath: d:\Hackathon B2B\back-to-barter\backend\routes\ecoMeter.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/Item');
const authenticateToken = require('../middleware/authenticateToken'); // Import only

// Get eco meter data for a user
router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const claimedItems = await Item.find({ claimedBy: userId });
    const ecoScore = claimedItems.reduce((total, item) => total + item.ecoScore, 0);

    res.status(200).json({ ecoScore });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;