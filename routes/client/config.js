const express = require("express");
const router = express.Router();
const {
  navItemsWithCount,
} = require("./../route-utils/config-utils");
const Article = require("../../schema/article");
const NavItem = require("../../schema/NavItemConfig");

// GET app config data
// returns app config data object (navItems)
router.get("/app-config", async (req, res) => {
  try {
    const navItems = await NavItem.find({
      active: true,
    }).select('name');

    res.json({
      nav: navItems.map((item) => item.name),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;