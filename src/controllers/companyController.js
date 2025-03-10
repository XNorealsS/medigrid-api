const Company = require('../models/Company');

exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOne();
    if (!company) {
      return res.status(404).json({ message: 'Profil perusahaan belum dibuat' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createCompanyProfile = async (req, res) => {
  try {
    // Cek jika profil sudah ada
    const existing = await Company.findOne();
    if (existing) {
      return res.status(400).json({ message: 'Profil perusahaan sudah ada' });
    }
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompanyProfile = async (req, res) => {
    try {
      const company = await Company.findOne();
      if (!company) {
        return res.status(404).json({ message: "Profil perusahaan tidak ditemukan" });
      }
      // Pastikan setiap field diambil dari request, dan gunakan nilai lama jika tidak dikirim
      const updatedData = {
        name: req.body.name || company.name,
        address: req.body.address || company.address,
        phone: req.body.phone || company.phone,
        email: req.body.email || company.email,
        description: req.body.description || company.description,
      };
  
      const updatedCompany = await company.update(updatedData);
      res.status(200).json(updatedCompany);
    } catch (error) {
      console.error("Error updating company profile:", error);
      res.status(400).json({ error: error.message });
    }
  };
  