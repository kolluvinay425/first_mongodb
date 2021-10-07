import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import postsRouter from "./services/blog/index.js";

import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import authorRoutes from "./services/authors/index.js";
const server = express();
const port = process.env.PORT || 3001;
server.use(cors());
server.use(express.json());

server.use("/posts", postsRouter);
server.use("/authors", authorRoutes);
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
