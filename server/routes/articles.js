import express from 'express';
import Article from '../models/Article.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET all articles
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new article (requires auth)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const article = new Article({
      title,
      content,
      category,
      author: req.user.email.split('@')[0],
      authorEmail: req.user.email,
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update article (requires auth)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (article.authorEmail !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }

    Object.assign(article, req.body);
    article.updatedAt = new Date();
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE article (requires auth)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (article.authorEmail !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await Article.deleteOne({ _id: req.params.id });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
