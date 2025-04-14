require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- KAMU LUPA INI!
const path = require("path");

const companyRoutes = require('./routes/Company');
const newsRoutes = require('./routes/news');
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS config
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Static files for image access
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", companyRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Express server running on port ${port}`);
});
