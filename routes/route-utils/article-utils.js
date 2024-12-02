const Tag = require("../../schema/tag");
const Article = require("../../schema/article");

const handleTags = async (tags) => {
  tags.forEach(async (tag) => {
    const existingTag = await Tag.findOne({
      name: tag,
    });
    if (!existingTag) {
      const newTag = new Tag({
        name: tag.trim(),
        count: 1,
      });
      await newTag.save();
    } else {
      existingTag.count += 1;
      await existingTag.save();
    }
  });
};

const articlesByText = async (text) => {
  const articles = await Article.find({
    $or: [
      { title: { $regex: text, $options: "i" } },
      { caption: { $regex: text, $options: "i" } },
    ],
  });

  return articles;
};

module.exports = { handleTags, articlesByText };