const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "contributor", "readonly"],
      required: true,
    },
    restricted: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date || null,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminUser", AdminUserSchema);
