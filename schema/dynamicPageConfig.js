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
    active: {
      type: Boolean,
      default: true,
    },
    heroConfig: {
      enabled: {
        type: Boolean,
        default: true,
      },
      layout: {
        type: String, // quad-list | quad-grid | carousel | grid
        required: true,
        default: "quad-list",
      },
      articles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Article",
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const DynamicPageConfig = mongoose.model("DynamicPageConfig", dynamicPageConfigSchema);

module.exports = DynamicPageConfig;
