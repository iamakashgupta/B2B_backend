const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const leaderboard = [
    { username: 'Rohit', score: 120 },
    { username: 'Sneha', score: 110 },
    { username: 'Aman', score: 105 },
  ];
  res.json(leaderboard);
});

module.exports = router;
