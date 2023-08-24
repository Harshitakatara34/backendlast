const express = require("express");
const { BlogModel } = require("../models/blog.model"); 
const authMiddleware = require("../Middleware/user.middleware");
const blog = express.Router();



blog.post("/api/blogs", authMiddleware, async (req, res) => {
  const { title, content, category, author } = req.body;
  const authorId = req.user.userId; 

  try {
    const blogInstance = new BlogModel({
      title,
      content,
      category,
      author,
      userId: authorId,
    });

    const createdBlog = await blogInstance.save();
    res.json({ msg: "Blog created successfully", blog: createdBlog });
  } catch (error) {
    res.json({ msg: "Error" });
  }
});

blog.get("/api/blogs", authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const blogs = await BlogModel.find({ userId }); 
    res.json(blogs);
  } catch (error) {
    res.json({ msg: "Error" });
  }
});

module.exports = { blog };
