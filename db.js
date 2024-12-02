const mongoose = require('mongoose');

// MongoDB Connection
const connectDB = async () => {
  console.log("attempting to connet to MongoDB...")
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };