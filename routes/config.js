const express = require("express");
const NavItem = require("../schema/NavItemConfig");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { getArticleCountByTag } = require("./route-utils/config-utils");

router.get("/dashboard", async (req, res) => {
  try {
    let navItems = await NavItem.find();
    navItems = await Promise.all(
      navItems.map(async (navItem) => ({
        ...navItem.toObject(), // Convert Mongoose document to plain object
        count: await getArticleCountByTag(navItem.tags),
      }))
    );

    res.json({
      nav: navItems,
      carouselItems: [],
      secondaryModules: [],
      tracks: [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

    // article count
    const articleCount = await getArticleCountByTag(req.body.tags);

    // Create a new NavItem
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
      res
        .status(400)
        .json({
          message: isDuplicate ? `Item name already exists` : err.message,
        });
    }
  }
);

router.patch("/dashboard/nav-item/:id", async (req, res) => {
  try {
    console.log("UPDATE NAVITEM");
    const updatedItem = await NavItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // update only the provided fields
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
