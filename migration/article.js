const { default: mongoose } = require("mongoose");
const { connectDB } = require("../db");
const Article = require("../schema/article");
require("dotenv").config();

(async function() {
  try {
    connectDB();

    const result = await Article.updateMany(
      // {}, // Match all documents
      { blocks: { $exists: true } }, // match only documents with the blocks field
      { $unset: { blocks: "" } }, // payload
      { strict: false } // Allow unsetting fields not in the schema
    );
    console.log(`${result.modifiedCount} documents were updated`);
    // const articles = await Article.find({ blocks: { $exists: true } });
    // console.log("Found articles:", articles.length);
    
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
})();