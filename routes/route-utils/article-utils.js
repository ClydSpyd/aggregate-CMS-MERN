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

const articlesByText = async (text, caption) => {
  const query = {
    $or: [
      { title: { $regex: text, $options: "i" } },
    ],
  };

  if (caption) {
    query.$or.push({ caption: { $regex: caption, $options: "i" } });
  }

  const articles = await Article.find(query).populate("author", {
    username: 1,
    avatarUrl: 1,
  });
  return articles;
};

const getRandomArticles = async (count) => {
  const articles = await Article.aggregate([
    { $match: { published: true } },
    { $sample: { size: count } },
    {
      $project: {
        content: 0,
        rawContent: 0,
        sourceUrl: 0,
        source: 0,
        published: 0,
        highlight: 0,
      },
    },
  ]);
  return articles;
};

module.exports = { handleTags, articlesByText, getRandomArticles };