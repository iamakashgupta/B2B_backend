// backend/controllers/itemController.js
const Item = require("../models/Item");
const User = require("../models/user");

// Create (donate) item
exports.createItem = async (req, res) => {
  try {
    const { name, description, category, ownerId, weightage } = req.body;

    const newItem = new Item({
      name,
      description,
      category,
      owner: ownerId,
      weightage: weightage || 1,
    });

    await newItem.save();

    // update donor stats
    await User.findByIdAndUpdate(ownerId, {
      $inc: {
        donatedItems: 1,
        barterCoins: weightage || 1
      }
    });

    res.status(201).json({ message: "Item donated successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to donate item", error: err.message });
  }
};

// Get all unclaimed items
exports.getAvailableItems = async (req, res) => {
  try {
    const items = await Item.find({ claimedBy: null }).populate("owner", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items", error: err.message });
  }
};

// Claim an item
exports.claimItem = async (req, res) => {
  try {
    const { userId } = req.body;
    const itemId = req.params.id;

    const item = await Item.findById(itemId);
    if (!item || item.claimedBy)
      return res.status(400).json({ message: "Item already claimed or not found" });

    const user = await User.findById(userId);
    if (user.barterCoins < item.weightage)
      return res.status(400).json({ message: "Not enough BarterCoins" });

    item.claimedBy = userId;
    await item.save();

    // deduct coins from user
    user.barterCoins -= item.weightage;
    await user.save();

    res.json({ message: "Item claimed successfully", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to claim item", error: err.message });
  }
};
