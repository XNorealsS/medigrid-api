const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Route untuk menambahkan berita (POST)
router.post('/', newsController.createNews);

// Route lain bisa ditambahkan nanti, misalnya GET semua berita
router.get('/', newsController.getAllNews);

module.exports = router;
