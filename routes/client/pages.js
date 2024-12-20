const express = require("express");
const router = express.Router();
const Article = require("../../schema/article");

// GET homepage data
// returns homepage data object (carouselItems, secondaryModules, tracks)
router.get("/home", async (req, res) => {
    try {
      const carouselItems = await Article.find(
        {
          highlight: { $in: ["primary"] },
          published: true,
        },
        {
          content: 0,
          rawContent: 0,
          sourceUrl: 0,
          source: 0,
          published: 0,
          highlight: 0,
        }
      );
  
      res.json({
        carouselItems,
        secondaryModules: [],
        tracks: [],
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;