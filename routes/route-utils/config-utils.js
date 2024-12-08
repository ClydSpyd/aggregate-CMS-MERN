const NavItem = require("../../schema/NavItemConfig");
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

// retrieve all nav items and return with article count
const navItemsWithCount = async () => {
  const navItems = await NavItem.find();
    return await Promise.all(
      navItems.map(async (navItem) => ({
        ...navItem.toObject(),
        count: await getArticleCountByTag(navItem.tags),
      }))
    );
};

module.exports = {
    getArticleCountByTag,
    navItemsWithCount,
};