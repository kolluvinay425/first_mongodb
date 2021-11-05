import express from "express";
import author from "../schema/authors.js";
import blogPost from "../schema/blogSchema.js";
import basicAuthMiddleware from "../auth/basic_auth.js";
import passport from "passport";
const authorRoutes = express.Router();

authorRoutes.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authorRoutes.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    try {
      console.log("userr", req.user);
    } catch (error) {
      next(error);
    }
  }
);
authorRoutes.post("/", async (req, res, next) => {
  try {
    const postAuthor = new author(req.body);
    const saveAuthor = await postAuthor.save();
    res.send(saveAuthor);
  } catch (error) {
    console.log(error);
  }
});
authorRoutes.get("/me/stories", basicAuthMiddleware, async (req, res) => {
  // console.log(req.headers);
  const blogs = await blogPost.find({ author: req.user._id.toString() });
  res.send(blogs);
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
      const post = {
        ...postId.toObject(),
      };
      const addauthor = await author.findByIdAndUpdate(
        req.params.postId,
        { $push: { posts: post } },
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
