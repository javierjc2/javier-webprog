const Article = require('../models/Article');

// ── GET /api/articles ─────────────────────────────────────────────────────────
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).sort({ createdAt: -1 });
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ── POST /api/articles ────────────────────────────────────────────────────────
const createArticle = async (req, res) => {
    try {
        const exists = await Article.findOne({ slug: req.body.slug?.toLowerCase() });
        if (exists) {
            return res.status(400).json({ message: 'Slug already exists' });
        }
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── PUT /api/articles/:id ─────────────────────────────────────────────────────
const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── DELETE /api/articles/:id ──────────────────────────────────────────────────
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── PATCH /api/articles/:id/toggle ───────────────────────────────────────────
const toggleArticleStatus = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        article.isActive = !article.isActive;
        await article.save();
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle, toggleArticleStatus };
