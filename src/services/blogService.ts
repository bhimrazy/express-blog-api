import Blog from "../models/blog";

export const getAllBlogs = async () => {
  return await Blog.find();
};

export const createBlog = async (blog: any) => {
  return await Blog.create(blog);
};
export const getBlogById = async (id: any) => {
  return await Blog.findById(id);
};

export const updateBlog = async (id: any, blog: any) => {
  return await Blog.findByIdAndUpdate(id, blog);
};

export const deleteBlog = async (id: any) => {
  return await Blog.findByIdAndDelete(id);
};
