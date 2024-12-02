const express = require("express");
const Tag = require("../schema/tag");
const router = express.Router();

router.get("/all-tags", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags.map((tag) => tag.name));  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;