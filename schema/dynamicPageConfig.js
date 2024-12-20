const mongoose = require("mongoose");

const dynamicPageConfigSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    layout: {
      type: String,
      default: "standard",
    },
    active: {
      type: Boolean,
      default: true,
    },
    hero: {
      type: Boolean,
      default: true,
    },
    heroArticles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Article",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const DynamicPageConfig = mongoose.model("DynamicPageConfig", dynamicPageConfigSchema);

module.exports = DynamicPageConfig;
