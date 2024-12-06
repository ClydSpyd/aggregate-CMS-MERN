const express = require("express");
const router = express.Router();
const Article = require("../schema/article");
const { body, validationResult } = require("express-validator");
const { handleTags } = require("./route-utils/article-utils");
const filteringRoutes = require("./article_filtering");
const verifyToken = require("../middleware/verify-token");

// filtering routes
router.use("/", filteringRoutes);

// GET all articles
router.get("/all", verifyToken, async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET article by ID
router.get("/id/:id", verifyToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new article
router.post(
  "/create",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("caption").notEmpty().withMessage("caption is required"),
    body("content").notEmpty().withMessage("content is required"),
    body("imgUrl").notEmpty().withMessage("imgUrl is required"),
    body("tags")
      .isArray({ min: 1 })
      .withMessage("tags must be a non-empty array"),
    body("source").notEmpty().withMessage("source is required"),
    body("sourceUrl").notEmpty().withMessage("sourceUrl is required"),
    body("blocks").notEmpty().withMessage("blocks is required"),
  ],
  verifyToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors
          .array()
          .map((err) => ({ field: err.path, message: err.msg })),
      });
    }

    try {
      const newArticle = new Article({
        title: req.body.title,
        caption: req.body.caption,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        tags: req.body.tags,
        source: req.body.source,
        sourceUrl: req.body.sourceUrl,
        blocks: req.body.blocks,
      });

      // extract tags and save to tags collection in db
      const tags = req.body.tags;
      handleTags(tags);

      const savedArticle = await newArticle.save();

      res.status(200).json(savedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// PATCH update article by ID
router.patch("/update/:id", verifyToken, async (req, res) => {
  try {
    console.log("UPDATE ARTICLE");
    console.log(req.params);
    // Use findByIdAndUpdate to update the article with the new payload
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set to update only the provided fields
      { new: true, runValidators: true } // new: true returns the updated document
    );

    // Check if the article exists
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE article by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (deletedArticle) {
      res.json(deletedArticle);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
