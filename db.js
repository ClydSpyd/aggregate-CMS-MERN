const mongoose = require("mongoose");

// MongoDB Connection
const connectDB = async () => {
  console.log("attempting to connet to MongoDB...");
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
