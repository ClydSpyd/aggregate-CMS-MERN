const express = require("express");
const router = express.Router();
const {
} = require("./../route-utils/config-utils");
const DynamicPageConfig = require("../../schema/dynamicPageConfig");

// GET app config data
// returns app config data object (pageConfigs)
router.get("/app-config", async (req, res) => {
  try {
    const pageConfigs = await DynamicPageConfig.find({
      active: true,
    }).select('name');

    res.json({
      nav: pageConfigs.map((item) => item.name),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;