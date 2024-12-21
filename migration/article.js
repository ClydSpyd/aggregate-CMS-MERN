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

    // Iterate over each article, update rawContent and remove starting space from tags
    for (const article of articles) {

      if (!article.rawContent) {
        article.rawContent = "DEFAULT CONTENT";
        await article.save();
      }

      if (article.tags && article.tags.length > 0) {
        article.tags = article.tags.map(tag => tag.trimStart());
        await article.save();
      }
      
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