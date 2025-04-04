const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Route Imports
const productRoutes = require('./routes/product');
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");
const leaderboardRoutes = require("./routes/leaderboard");

// 🛣 Route Mounting
app.use('/api/products', productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// 🔗 MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(err => console.error('MongoDB connection error:', err));


// 🚀 Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
