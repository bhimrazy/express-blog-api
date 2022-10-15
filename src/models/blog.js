import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;