const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Adjust the path as necessary

// Claim an item
router.put('/claim/:productId', async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;

  try {
    const item = await Item.findById(productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.claimedBy) {
      return res.status(400).json({ message: 'Item already claimed' });
    }
    item.claimedBy = userId;
    await item.save();
    res.status(200).json({ message: 'Item claimed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
