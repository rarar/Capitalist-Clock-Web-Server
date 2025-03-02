// app.js - Main application file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Post Schema and Model
const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 280
  },
  author: {
    type: String,
    default: 'Unknown'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    default: 'manual' // 'manual' or 'twitter'
  }
});

const Post = mongoose.model('Post', postSchema);

// Routes - API Endpoints
// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    // Limit to latest 10 posts by default, sorted by creation date
    const limit = parseInt(req.query.limit) || 10;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a specific post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Format posts for Arduino (simplified format with limited characters)
app.get('/api/arduino/posts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    
    // Format posts for Arduino display (simplified JSON)
    const simplifiedPosts = posts.map(post => ({
      id: post._id,
      text: post.text.substring(0, 240), // Limit text length for LCD display
      author: post.author
    }));
    
    res.json(simplifiedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new manual post
app.post('/api/posts', async (req, res) => {
  try {
    const { text, author } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Post text is required' });
    }
    
    const newPost = new Post({
      text,
      author: author || 'Anonymous',
      source: 'manual'
    });
    
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});