const express = require("express");
const router = express.Router();
const Article = require("../schema/article");
const { articlesByText } = require("./route-utils/article-utils");
const verifyToken = require("../middleware/verify-token");

// GET all articles with given tags
router.post("/search/tags", verifyToken, async (req, res) => {
  try {
    const tags = req.body.tags;

    // find all articles that contain the tags
    const articles = await Article.find({ tags: { $in: tags } });
    if (articles.length === 0) {
      return res.status(200).json({ message: "No articles found" });
    } else {
      res.json(articles);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all articles containing text in title/caption
router.post("/search/text", verifyToken, async (req, res) => {
  try {
    const text = req.body.text;
    let articles = await articlesByText(text);
    return articles.length === 0
      ? res.status(200).json({ message: "No articles found" })
      : res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET search articles text + tags
router.post("/search/filters", verifyToken, async (req, res) => {
  try {
    const { text, tags } = req.body;
    let articles = await articlesByText(text);
    if (tags.length > 0) {
      articles = articles.filter((article) =>
        tags.every((tag) => article.tags.includes(tag))
      );
    }
    res.status(200).json(
      articles.map((article) => ({
        id: article._id,
        title: article.title,
        caption: article.caption,
        tags: article.tags,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET most recent articles,
// :num variable defines how many articles are returned
router.get("/recent", verifyToken, async (req, res) => {
  try {
    const num = req.query.num ?? 10;
    const articles = await Article.find().sort({ _id: -1 }).limit(num);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
