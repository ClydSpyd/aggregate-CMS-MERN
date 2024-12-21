const express = require("express");
const DynamicPageConfig = require("../schema/DynamicPageConfig");
const { getArticlesByTags } = require("./route-utils/config-utils");
const router = express.Router();

// GET page by name
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const pageConfig = await DynamicPageConfig.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!pageConfig) {
      return res.status(404).json({ message: "Page not found" });
    }

    const articles = await getArticlesByTags(pageConfig.tags);

    return res.status(200).json({ ...pageConfig.toObject(), articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
