import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogPost = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: false },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: false },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: false,
      },
    },
    comments: [],
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default model("Blog", blogPost);
