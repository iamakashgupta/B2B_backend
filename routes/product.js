const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔽 GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔼 POST /api/products - Donate a new product
router.post('/', async (req, res) => {
  try {
    const { title, description, weight, image } = req.body;
    const newProduct = new Product({ title, description, weight, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/products/claim/:id
router.put('/claim/:id', async (req, res) => {
    try {
      const { userId } = req.body; // assuming you pass user ID when claiming
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.claimed) return res.status(400).json({ message: "Already claimed" });
  
      product.claimed = true;
      product.claimedBy = userId;
      await product.save();
  
      res.json({ message: "Product claimed successfully", product });
    } catch (err) {
      console.error("Error claiming product:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
