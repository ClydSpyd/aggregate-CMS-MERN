const express = require("express");
const DynamicPageConfig = require("../schema/dynamicPageConfig");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  getArticleCountByTags,
  navItemsWithCount,
} = require("./route-utils/config-utils");
const Article = require("../schema/article");

// GET dash config data
// returns dash config data object (nav, carouselItems, secondaryModules, tracks)
router.get("/dashboard", async (req, res) => {
  try {
    const navItems = await navItemsWithCount();
    const carouselItems = await Article.find({
      highlight: { $in: ["primary"] },
      published: true,
    });

    res.json({
      nav: navItems,
      carouselItems,
      secondaryModules: [],
      tracks: [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET dynamic page config data by name
// returns dynamic page config data object
router.get("/dynamic-page/:name", async (req, res) => {
  try {
    const pageConfig = await DynamicPageConfig.findOne({
      name: { $regex: new RegExp(`^${req.params.name}$`, "i") },
    }).populate('heroConfig.articles');

    if (!pageConfig) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(pageConfig);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new dynamic page config
// create new dynamic page config, return updated array of dynamic page configs
router.post(
  "/dynamic-page",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("tags").isArray().withMessage("tags must be an array"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: errors.array() });
    }

    const articleCount = await getArticleCountByTags(req.body.tags);

    try {
      const pageConfig = new DynamicPageConfig({
        name: req.body.name,
        tags: req.body.tags,
      });

      await pageConfig.save();
      res.status(201).json({ ...pageConfig.toObject(), count: articleCount });
    } catch (err) {
      console.log(err.message);
      const isDuplicate = err.message.includes(
        "duplicate key error collection"
      );
      res.status(400).json({
        message: isDuplicate ? `Item name already exists` : err.message,
      });
    }
  }
);

// DELETE dynamic page config
// delete dynamic page config with :id param, return updated array of dynamic page configs
router.delete("/dynamic-page/:id", async (req, res) => {
  try {
    await DynamicPageConfig.findByIdAndDelete(req.params.id);

    const navItems = await navItemsWithCount();
    res.json(navItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update dynamic page config
// update dynamic page config, return updated array of dynamic page configs
router.patch("/dynamic-page/:id", async (req, res) => {
  try {
    const pageConfig = await DynamicPageConfig.findOne({
      name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
      _id: { $ne: req.params.id },
    });
    if (pageConfig) {
      return res.status(400).json({ message: "Item name already exists" });
    }

    await DynamicPageConfig.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // update only the provided fields
      { new: true }
    );

    const navItems = await navItemsWithCount();
    res.json(navItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add carousel items
// add carousel items with array of IDs, return updated array of carousel items
router.post("/home/carousel-items", async (req, res) => {
  try {
    // update highlight field of articles
    await Article.updateMany(
      { _id: { $in: req.body.articleIds } },
      { $set: { highlight: "primary" } }
    );

    const carouselItems = await Article.find({
      highlight: { $in: ["primary"] },
      published: true,
    });

    res.json(carouselItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST remove carousel item
// remove carousel item with :id param, return updated array of carousel items
router.delete("/home/carousel-items/:id", async (req, res) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, {
      $pull: { highlight: "primary" },
    });

    const carouselItems = await Article.find({
      highlight: { $in: ["primary"] },
      published: true,
    });

    res.json(carouselItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
