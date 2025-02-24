const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/google-login", async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const token = jwt.sign({ name, email, image }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.json({ token, user: { name, email, image } });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
