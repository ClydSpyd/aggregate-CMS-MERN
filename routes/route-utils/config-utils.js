const Article = require("../../schema/article");

const getArticleCountByTag = async (tags) => {
    const count = await Article.countDocuments({
      $or: [
        { tags: { $in: tags } },
        // { caption: { $in: tags } },
        // { name: { $in: tags } },
      ],
      $and: [{ published: true }],
    });
    return count;
}

module.exports = {
    getArticleCountByTag,
};