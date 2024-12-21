const DynamicPageConfig = require("../../schema/DynamicPageConfig");
const Article = require("../../schema/article");

const getArticlesByTags = async (tags) => {
  const items = await Article.find({
    tags: { $in: tags },
    published: true,
  });
  return items.map((item) => item.toObject());
}

const getArticleCountByTags = async (tags) => {
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

// retrieve all nav items and return with article count
const navItemsWithCount = async () => {
  const navItems = await DynamicPageConfig.find();
    return await Promise.all(
      navItems.map(async (navItem) => ({
        ...navItem.toObject(),
        count: await getArticleCountByTags(navItem.tags),
      }))
    );
};

module.exports = {
  getArticlesByTags,
  getArticleCountByTags,
  navItemsWithCount,
};