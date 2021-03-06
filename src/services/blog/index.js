import express from "express";
import createHttpError from "http-errors";
import blogPost from "../schema/blogSchema.js";
import blogComment from "../schema/blogComments.js";
const postsRouter = express.Router();

postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new blogPost(req.body);
    const { _id } = await newPost.save();

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

    const post = await blogPost.findById(postId);

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
      new: true,
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
postsRouter.post("/:postId/comments", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await blogPost.findById(postId);

    if (post) {
      const createComment = await blogComment.create(req.body);

      const comment = { ...createComment.toObject() };
      const updatePost = await blogPost.findByIdAndUpdate(req.params.postId, {
        $push: { comments: comment },
      });

      res.send(updatePost);
    } else {
      next(createHttpError(404, `post with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
postsRouter.get("/:postId/comments", async (req, res, next) => {
  try {
    const postComment = await blogPost.findById(req.params.postId);
    if (postComment) {
      res.send(postComment.comments);
    } else {
      next(
        createHttpError(404, `post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
postsRouter.get("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const post = await blogPost.findById(req.params.postId);
    if (post) {
      const comment = post.comments.find(
        (comment) => comment._id.toString() === req.params.commentId
      );
      if (comment) {
        res.send(comment);
      } else {
        res
          .status(401)
          .send(`comment with id ${req.params.commentId} not found`);
      }
    }
  } catch (error) {
    next(error);
  }
});
postsRouter.put("/:postId/comments/:commentId", (req, res, next) => {});
postsRouter.delete("/:postId/comments/:commentId", (req, res, next) => {});
export default postsRouter;
