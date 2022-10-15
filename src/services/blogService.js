import Blog from "../models/blog.js"
var blogService = {}

blogService.getAllBlogs = async () => {
    return await Blog.find();
};

blogService.createBlog = async (blog) => {
    return await Blog.create(blog);
};
blogService.getBlogById = async (id) => {
    return await Blog.findById(id);
};

blogService.updateBlog = async (id, blog) => {
    return await Blog.findByIdAndUpdate(id, blog);
};

blogService.deleteBlog = async (id) => {
    return await Blog.findByIdAndDelete(id);
};

export default blogService