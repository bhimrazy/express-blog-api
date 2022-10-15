import express from "express";
const blogRouter = express.Router();
import {
    getAllBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js"

blogRouter.route("/").get(getAllBlogs).post(createBlog);
blogRouter.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
export default blogRouter;