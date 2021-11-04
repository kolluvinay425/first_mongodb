import mongoose from "mongoose";
import bcrypt from "bcrypt";
import authorModel from "../schema/authors.js";
const author = new mongoose.Schema(
  {
    name: {
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
    },
    posts: [],
  },
  { timestamps: true }
);

author.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

author.methods.toJSON = function () {
  const authorDoc = this;
  const authorObj = authorDoc.toObject();
  delete authorObj.password;

  return authorObj;
};
author.statics.findByCredentials = async function (email, password) {
  const user = await authorModel.findOne({ email });
  try {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else return null;
  } catch {}
};
export default mongoose.model("Author", author);
