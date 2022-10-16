import express from "express";
const blogRouter = express.Router();
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { verifyUserToken } from "../middlewares/verifyUserToken";
import {
  createBlogDataValidator,
  updateBlogDataValidator,
} from "../validators/blog.validator";

blogRouter
  .route("/")
  .get(getAllBlogs)
  .post(verifyUserToken, createBlogDataValidator, createBlog);
blogRouter
  .route("/:id")
  .get(getBlogById)
  .put(verifyUserToken, updateBlogDataValidator, updateBlog)
  .delete(verifyUserToken, deleteBlog);
export default blogRouter;
