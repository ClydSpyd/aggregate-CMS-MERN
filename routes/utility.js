const express = require("express");
const Tag = require("../schema/tag");
const { getArticleCountByTags } = require("./route-utils/config-utils");
const router = express.Router();

// GET all tags
// returns an array of all tags in the db (string values only)
router.get("/all-tags", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags.sort((a, b) => b.count - a.count).map((tag) => tag.name));  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all tag data
// returns all tags in the db (full tag objects)
router.get("/tag-data", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET article count
// returns the number of articles in db with the given tags
router.post("/article-count", async (req, res) => {
    try {
        const tags = req.body.tags;
        const count = await getArticleCountByTags(tags);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;