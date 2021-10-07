import express from "express";
import author from "../schema/authors.js";
import blogPost from "../schema/blogSchema.js";
const authorRoutes = express.Router();

authorRoutes.post("/", async (req, res, next) => {
  try {
    const postAuthor = new author(req.body);
    const saveAuthor = await postAuthor.save();
    res.send(saveAuthor);
  } catch (error) {
    console.log(error);
  }
});
authorRoutes.get("/", async (req, res, next) => {
  try {
    const getAuthors = await author.find();
    res.send(getAuthors);
  } catch (error) {
    console.log(error);
  }
});
authorRoutes.post("/:postId", async (req, res, next) => {
  try {
    const postId = await blogPost.findById(req.params.postId);
    if (postId) {
      const addauthor = await author.findByIdAndUpdate(
        req.params.postId, // WHO we want to modify
        { $push: { authors: req.body } }, // HOW we want to modify him/her
        { new: true }
      );
      res.send(addauthor);
    } else {
      res.status(401).send("id not found");
    }
  } catch (error) {
    console.log(error);
  }
});
authorRoutes.put("/:authorId", async (req, res, next) => {});
authorRoutes.delete("/:authorId", async (req, res, next) => {});

export default authorRoutes;
