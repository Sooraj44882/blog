const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 

router.post('/', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost); 
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true } 
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;