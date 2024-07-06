const express = require('express');
const router = express.Router();
const { index, show } = require('../controllers/category.controller');
const { search } = require('../controllers/categorySearch.controller');

router.get('/', index);
router.get('/:id', show);
router.get('/search/:category_name', search);

module.exports = router;
