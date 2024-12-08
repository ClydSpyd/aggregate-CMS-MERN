const express = require("express");
const NavItem = require("../schema/NavItemConfig");
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

// POST new nav item
// create new nav item, return updated array of nav items
router.post(
  "/dashboard/nav-item",
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
      const navItem = new NavItem({
        name: req.body.name,
        tags: req.body.tags,
      });

      await navItem.save();
      res.status(201).json({ ...navItem.toObject(), count: articleCount });
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

// DELETE nav item
// delete nav item with :id param, return updated array of nav items
router.delete("/dashboard/nav-item/:id", async (req, res) => {
  try {
    await NavItem.findByIdAndDelete(req.params.id);

    const navItems = await navItemsWithCount();
    res.json(navItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update nav item
// update nav item, return updated array of nav items
router.patch("/dashboard/nav-item/:id", async (req, res) => {
  try {
    const navItem = await NavItem.findOne({
      name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
      _id: { $ne: req.params.id },
    });
    if (navItem) {
      return res.status(400).json({ message: "Item name already exists" });
    }

    await NavItem.findByIdAndUpdate(
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
router.post("/dashboard/carousel-items", async (req, res) => {
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
router.delete("/dashboard/carousel-items/:id", async (req, res) => {
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
