import mongoose from "mongoose";

// const { model, Schema } = mongoose

const blogComment = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", blogComment);
