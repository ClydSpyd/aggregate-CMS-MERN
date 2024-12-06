const { default: mongoose } = require("mongoose");
const { connectDB } = require("../db");
const Article = require("../schema/article");
require("dotenv").config();

(async function() {
  try {
    connectDB();

    const payload = { published: true }
    // const payload = { highlight: [] };

    const result = await Article.updateMany(
      {}, // Match all documents
      { $set: payload }
    );

    console.log(`${result.modifiedCount} documents were updated`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
})();