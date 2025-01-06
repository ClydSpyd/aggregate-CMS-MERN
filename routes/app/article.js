const express = require("express");
const router = express.Router();
const Article = require("../../schema/article");

// GET all articles
// router.get("/all", verifyToken, async (req, res) => {
router.get("/all", async (req, res) => {
  try {
    console.log("ööGET /client/article/all");
    const articles = await Article.find({ published: true }).populate(
      "author",
      {
        username: 1,
        avatarUrl: 1,
      }
    );

    articles.sort(() => Math.random() - 0.5);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", {
      username: 1,
      avatarUrl: 1,
    });
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
