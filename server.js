const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const leaderboardRoutes = require('./routes/leaderboard');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Route Imports
const productRoutes = require('./routes/product');
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");

// 🛣 Route Mounting
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/products', productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// 🔗 MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/backtobarter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection failed ❌", err));

// 🚀 Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});