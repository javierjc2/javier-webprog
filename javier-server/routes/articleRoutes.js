const express = require('express');
const {
    getArticles, createArticle, updateArticle,
    deleteArticle, toggleArticleStatus,
} = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getArticles)           // public – landing page reads this
    .post(protect, createArticle);

router.route('/:id')
    .put(protect, updateArticle)
    .delete(protect, deleteArticle);

router.patch('/:id/toggle', protect, toggleArticleStatus);

module.exports = router;
