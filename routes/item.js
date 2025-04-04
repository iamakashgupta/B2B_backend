// backend/routes/item.js
const express = require("express");
const router = express.Router();
const {
  createItem,
  getAvailableItems,
  claimItem
} = require("../controllers/itemController");

router.post("/", createItem); // Donate item
router.get("/", getAvailableItems); // List all unclaimed items
router.post('/claim/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
  
    try {
      const item = await Item.findById(id);
      if (!item) return res.status(404).json({ message: "Item not found" });
  
      if (item.claimedBy) {
        return res.status(400).json({ message: "Item already claimed" });
      }
  
      item.claimedBy = userId;
      await item.save();
  
      res.status(200).json({ message: "Item claimed successfully", item });
    } catch (err) {
      console.error("Claim error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
