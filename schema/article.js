const mongoose = require("mongoose");

const slideItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
  },
  title: {
    type: String,
    trim: true,
  },
  textContent: {
    type: String,
    trim: true,
  },
  imgUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

const listItemSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
  },
  textContent: {
    type: String,
    trim: true,
  },
});

const articleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
    },
    displayAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthorUser",
      required: false,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
      default: "",
      trim: true,
    },
    sourceUrl: {
      type: String,
      default: "",
    },
    rawContent: {
      type: String,
      default: "",
    },
    published: {
      type: Boolean,
      default: false,
    },
    highlight: {
      type: [String],
      default: [],
    },
    slideItems: {
      type: [slideItemSchema],
      required: false,
    },
    listItems: {
      type: [listItemSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ArticleHistory = mongoose.model("ArticleHistory", new mongoose.Schema({}, { strict: false }), "articles_history");

articleSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery()).lean();
  if (docToUpdate) {

    await ArticleHistory.create({
      articleId: docToUpdate._id,
      backup: docToUpdate,
      versionedAt: new Date(),
      operation: "update",
    });

    console.log(`✅ Pre-update backup stored for article: ${docToUpdate._id}`);
  }
  next();
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
