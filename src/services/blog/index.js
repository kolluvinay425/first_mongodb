import express from "express";
import createHttpError from "http-errors";
import blogPost from "./schema.js";

const postsRouter = express.Router();

postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new blogPost(req.body); // here happens validation of the req.body, if it is not ok Mongoose will throw a "ValidationError"
    const { _id } = await newPost.save(); // this is where the interaction with the db/collection happens

    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await blogPost.find();

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await blogPost.findById(postId); // similar to findOne, but findOne expects to receive a query as parameter

    if (post) {
      res.send(post);
    } else {
      next(createHttpError(404, `post with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const modifiedPost = await blogPost.findByIdAndUpdate(postId, req.body, {
      new: true, // returns the modified post
    });

    if (modifiedPost) {
      res.send(modifiedPost);
    } else {
      next(createHttpError(404, `User with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const deletedUser = await blogPost.findByIdAndDelete(postId);

    if (deletedUser) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
