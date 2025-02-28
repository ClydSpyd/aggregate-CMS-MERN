const mongoose = require("mongoose");

const AuthorUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthorUser", AuthorUserSchema);
