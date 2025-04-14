// controllers/newsController.js
const News = require('../models/News');

exports.createNews = async (req, res) => {
  try {
    const { title, subtitle, content, image_url } = req.body;

    const imageUrl = image_url || (req.file ? '/uploads/' + req.file.filename : null);

    const news = await News.create({
      title,
      subtitle,
      content,
      image_url: imageUrl,
      status: 1
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      data: news
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.findAll({ order: [['created_at', 'DESC']] });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
