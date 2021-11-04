import mongoose from "mongoose";
import Authors from "../schema/authors.js";
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Authors",
    },
    comments: [],
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

blogPost.pre("save", async function (done) {
  try {
    const isExist = await Authors.findById(this.author);
    if (isExist) {
      done();
    } else {
      const error = new Error("this author does not exist");
      error.status = 400;
      done(error);
    }
  } catch (error) {
    done(error);
  }
});

export default model("Blog", blogPost);
