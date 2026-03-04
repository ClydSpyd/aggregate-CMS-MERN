// watcher.js
require('dotenv').config();
const mongoose = require('mongoose');
// const { connectDB } = require('./db.js'); // adjust the path
const Article = require('./schema/article');

async function runWatcher() {
//   await connectDB();

  const ArticleHistory = mongoose.model("ArticleHistory", new mongoose.Schema({}, { strict: false }), "articles_history");

  const changeStream = Article.watch([], { fullDocument: "updateLookup" });

  changeStream.on("change", async (change) => {
    if (change.operationType === "update" || change.operationType === "replace") {
      const documentId = change.documentKey._id;
      const previousVersion = await Article.findById(documentId).lean();

      if (previousVersion) {
        await ArticleHistory.create({
          articleId: documentId,
          backup: previousVersion,
          versionedAt: new Date(),
          operation: change.operationType
        });

        console.log(`Backup stored for article: ${documentId}`);
      }
    }
  });

  console.log("✅ Change stream is now watching the articles collection...");
}

runWatcher().catch((err) => {
  console.error("Watcher failed to start:", err);
});
