require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/news");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("public/uploads"));
app.use("/api/news", newsRoutes);

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
