import mongoose from "mongoose";

const author = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    posts: [],
  },
  { timestamps: true }
);
export default mongoose.model("Author", author);
