// backend/routes/leaderboard.js
const express = require("express");
const router = express.Router();
const {
  getLeaderboard,
  getEcoStats
} = require("../controllers/leaderboardController");

router.get("/", getLeaderboard);
router.get("/eco-stats", getEcoStats);

module.exports = router;
