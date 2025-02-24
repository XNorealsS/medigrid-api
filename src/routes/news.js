const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const multer = require("multer");
const path = require("path");

// Konfigurasi multer untuk upload file
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9.\-]/g, "_");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    const safeName = sanitizeFilename(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + safeName);
  },
});
const upload = multer({ storage: storage });

// Routes
router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);
router.post("/", upload.single("image"), newsController.createNews);
router.put("/:id", upload.single("image"), newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

module.exports = router;
