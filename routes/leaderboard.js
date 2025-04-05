// seedUsers.js
const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path if needed

mongoose.connect('mongodb://127.0.0.1:27017/backtobarter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB ✅");
  seedData();
}).catch(err => {
  console.error("MongoDB connection error ❌:", err);
});

const sampleUsers = [
  { name: 'Akash', ecoPoints: 120, tradeCount: 5 },
  { name: 'Riya', ecoPoints: 300, tradeCount: 15 },
  { name: 'Aryan', ecoPoints: 250, tradeCount: 12 },
  { name: 'Sneha', ecoPoints: 180, tradeCount: 9 },
  { name: 'Karan', ecoPoints: 90, tradeCount: 3 },
  { name: 'Pooja', ecoPoints: 450, tradeCount: 20 },
  { name: 'Dev', ecoPoints: 200, tradeCount: 11 },
  { name: 'Meera', ecoPoints: 310, tradeCount: 17 },
  { name: 'Raj', ecoPoints: 130, tradeCount: 6 },
  { name: 'Tina', ecoPoints: 220, tradeCount: 8 }
];

async function seedData() {
  try {
    await User.deleteMany(); // Clean slate
    await User.insertMany(sampleUsers);
    console.log("Sample users inserted 🎉");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
}
