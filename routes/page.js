const express = require("express");
const NavItem = require("../schema/NavItemConfig");
const { getArticlesByTags } = require("./route-utils/config-utils");
const router = express.Router();

// GET page by name
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const navItem = await NavItem.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!navItem) {
      return res.status(404).json({ message: "Page not found" });
    }

    const articles = await getArticlesByTags(navItem.tags);

    return res.status(200).json({ ...navItem.toObject(), articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
