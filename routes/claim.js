const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { itemId, userId } = req.body;

  res.json({
    success: true,
    message: `Item ${itemId} claimed by user ${userId}`,
    claimId: Math.random().toString(36).substring(2, 10),
  });
});

module.exports = router;
