import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: [true, "Blog title required"] },
  description: { type: String, required: [true, "Blog description required"] },
  image: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
