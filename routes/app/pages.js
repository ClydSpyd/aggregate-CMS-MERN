const express = require("express");
const router = express.Router();
const { getRandomArticles } = require("../route-utils/article-utils");
const Article = require("../../schema/article");

// GET homepage data
// returns homepage data object (carouselItems, secondaryModules, tracks)
router.get("/home", async (req, res) => {
  console.log("ööGET /client/page/home");
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

      const latestRandom = await getRandomArticles(10);
      const recommendedRandom = await getRandomArticles(10);
  
      res.json({
        carouselItems,
        secondaryModules: [],
        tracks: [
          {
            title: "Latest News",
            articles: latestRandom,
          },
          {
            title: "Recommended",
            articles: recommendedRandom,
          },
        ],
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;