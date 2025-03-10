const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Endpoint untuk mendapatkan profil perusahaan
router.get('/company', companyController.getCompanyProfile);

// Endpoint untuk membuat profil perusahaan (jika belum ada)
router.post('/company', companyController.createCompanyProfile);

// Endpoint untuk mengupdate profil perusahaan
router.put('/company', companyController.updateCompanyProfile);

module.exports = router;
