import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, "Blog title required"] },
    description: {
      type: String,
      required: [true, "Blog description required"],
    },
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
