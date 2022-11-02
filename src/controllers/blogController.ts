import { Request, Response } from "express";
import { BlogService } from "../services/blogService";
import { validationResult } from "express-validator";
import { Serializer } from "../serializers/serializers";

interface userRequest extends Request {
  user?: any;
}

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.json({ status: "success", data: Serializer.blogsSerializer(blogs) });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const createBlog = async (req: userRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    req.body.author = req.user._id;
    const blog = await BlogService.createBlog(req.body);
    res.json({
      status: "success",
      message: "blog created successfully.",
      data: Serializer.blogSerializer(blog),
    });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.getBlogById(req.params.id);
    res.json({ status: "success", data: Serializer.blogSerializer(blog) });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.updateBlog(req.params.id, req.body);
    res.json({
      status: "success",
      message: "blog updated successfully.",
      data: Serializer.blogSerializer(blog),
    });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.deleteBlog(req.params.id);
    res.json({ status: "success", message: "blog deleted successfully." });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
