require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Nama database
  process.env.DB_USER,    // User database
  process.env.DB_PASS,    // Password database
  {
    host: process.env.DB_HOST, // Host, misal: localhost
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
