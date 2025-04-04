const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// On claim: remove item, deduct barter coins
router.post('/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.userId;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await User.findById(userId);
    if (!user || user.barterCoins < item.barterCoins) {
      return res.status(400).json({ message: 'Not enough barter coins' });
    }

    // Remove item and update user coins
    await Item.findByIdAndDelete(itemId);
    user.barterCoins -= item.barterCoins;
    user.claimedItems = (user.claimedItems || 0) + 1; // for ecometer
    await user.save();

    res.status(200).json({ message: 'Item claimed successfully' });
  } catch (err) {
    console.error('Claim error:', err);
    res.status(500).json({ message: 'Server error during claim' });
  }
});

module.exports = router;
