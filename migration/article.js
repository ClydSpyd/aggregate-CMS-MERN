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


      article.author =
        article.id === "6757fe8437c2a2e2935882dd"
          ? "6752d38281789dc33169addc"
          : "6752f4a305030b6ce7aca613";
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