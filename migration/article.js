const mongoose = require("mongoose");
const { connectDB } = require("../db");
const Article = require("../schema/article");
require("dotenv").config();

(async function() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all articles
    const articles = await Article.find({});

    // Iterate over each article, update type
    for (const article of articles) {


    article.type = "standard";
      await article.save();
    }

    console.log(`${articles.length} articles were processed`);

  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
})();