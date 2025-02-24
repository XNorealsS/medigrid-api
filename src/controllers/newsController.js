const pool = require("../config/db");
const path = require("path");
const fs = require("fs");

// GET all news
exports.getNews = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM news ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single news by id
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM news WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "News not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE news with image upload
exports.createNews = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = "/uploads/" + req.file.filename;
    }
    const [result] = await pool.query(
      "INSERT INTO news (title, subtitle, content, image_url) VALUES (?, ?, ?, ?)",
      [title, subtitle, content, imageUrl]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE news
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, currentImage } = req.body;
    let imageUrl = currentImage || null;
    if (req.file) {
      imageUrl = "/uploads/" + req.file.filename;
    }
    await pool.query(
      "UPDATE news SET title = ?, subtitle = ?, content = ?, image_url = ? WHERE id = ?",
      [title, subtitle, content, imageUrl, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE news
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    // Optional: Hapus file gambar dari disk
    const [rows] = await pool.query("SELECT image_url FROM news WHERE id = ?", [id]);
    if (rows.length > 0 && rows[0].image_url) {
      const filePath = path.join(__dirname, "../../public", rows[0].image_url);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    await pool.query("DELETE FROM news WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
