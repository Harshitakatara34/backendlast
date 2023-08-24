const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,required: true,
  },
  content: {
    type: String,required: true,
  },
  category: {
    type: String,required: true,
  },
  author: {
    type: String,required: true,
  },
  userId: {
    type: String,required: true,
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [
    {
      author: {
        type: String,
       
      },
      content: {
        type: String,
        
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  BlogModel,
};
