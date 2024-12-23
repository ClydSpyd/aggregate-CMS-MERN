const mongoose = require("mongoose");

const ClientUserSchema = new mongoose.Schema(
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
      enum: ["client", "guest"],
      required: true,
    },
    genres: {
      type: Array,
      default: [],
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Article",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientUser", ClientUserSchema);
