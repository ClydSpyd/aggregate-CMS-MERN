const mongoose = require("mongoose");

// Enum for block types (not strictly necessary for Mongoose, but useful for validation)
const blockTypes = ['paragraph', 'image', 'link', 'text'];

// Sub-schema for block properties (generic key-value pairs)
const PropsSchema = new mongoose.Schema({
  textColor: { type: String, default: 'default' },
  backgroundColor: { type: String, default: 'default' },
  textAlignment: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  name: { type: String },   // For image blocks
  url: { type: String },    // For image URL
  caption: { type: String }, // For image caption
  showPreview: { type: Boolean, default: true }, // Preview for image
  previewWidth: { type: Number } // Width for image preview
}, { _id: false }); // _id: false prevents creating an automatic _id for nested props

// Sub-schema for the content array (generic structure)
const ContentSchema = new mongoose.Schema({
  type: { type: String, required: true },  // Could be 'text', 'link', etc.
  text: { type: String },                  // Only used for text-based content
  href: { type: String },                  // For links
  styles: {
    bold: { type: Boolean, default: false },
    italic: { type: Boolean, default: false }
  },                                      // Optional styling for text content
  content: [this]                          // Recursive for nested content inside a link (optional)
}, { _id: false });

// Main block schema
const BlockSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for the block
  type: { type: String, required: true }, // Block type
  props: { type: PropsSchema }, // Properties for block (varies by type)
  content: [ContentSchema],    // Generic content array for all block types
  children: [{ type: mongoose.Schema.Types.Mixed }] // Children blocks, if needed (empty in your example)
});

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      required: false,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    blocks: [BlockSchema], // Array of block objects
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
