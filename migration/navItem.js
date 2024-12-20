const { default: mongoose } = require("mongoose");
const { connectDB } = require("../db");
const NavItemConfig = require("../schema/NavItemConfig");
require("dotenv").config();

(async function() {
  try {
    connectDB();

    const result = await NavItemConfig.updateMany({
      $set: { heroArticles: [] },
    });
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