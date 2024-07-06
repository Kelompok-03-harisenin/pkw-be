const express = require('express');
const router = express.Router();
const { index, show } = require('../controllers/category.controller');
const { search } = require('../controllers/categorySearch.controller');

// Get all categories
router.get('/', index);

// Get category by ID
router.get('/:id', show);

// Search categories by name
router.get('/search/:category_name', search);

module.exports = router;
