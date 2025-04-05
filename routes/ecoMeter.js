const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ status: 'Green', value: 82 });
});

module.exports = router;
