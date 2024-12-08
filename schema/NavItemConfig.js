const mongoose = require("mongoose");

const navItemSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const NavItem = mongoose.model("NavItem", navItemSchema);

module.exports = NavItem;
