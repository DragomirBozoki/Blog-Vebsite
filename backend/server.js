const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Paths
const postsPath = path.join(__dirname, 'posts.json');
const subscribersPath = path.join(__dirname, 'subscribers.json');

// Ensure JSON files exist
if (!fs.existsSync(postsPath)) fs.writeFileSync(postsPath, '[]');
if (!fs.existsSync(subscribersPath)) fs.writeFileSync(subscribersPath, '[]');

// GET all posts
app.get('/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  res.json(posts);
});

// POST new blog post
app.post('/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  posts.unshift(req.body); // add to beginning
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  res.status(201).json({ message: 'Post added' });
});

// DELETE a post by index
app.delete('/posts/:index', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const index = parseInt(req.params.index, 10);

  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.json({ message: 'Post deleted' });
  } else {
    res.status(404).json({ error: 'Invalid index' });
  }
});

// POST /subscribe
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const subscribers = JSON.parse(fs.readFileSync(subscribersPath));

  if (subscribers.find((s) => s.email === email)) {
    return res.status(409).json({ error: 'Already subscribed' });
  }

  const newEntry = {
    email,
    date: new Date().toISOString(),
  };

  subscribers.push(newEntry);
  fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
  res.status(200).json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
