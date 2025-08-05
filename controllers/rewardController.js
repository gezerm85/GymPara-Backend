const pool = require("../db");

// GET /api/rewards - Tüm ödülleri getir
const getRewards = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rewards ORDER BY id");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Ödül getirme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// POST /api/rewards - Yeni ödül ekle
const createReward = async (req, res) => {
  try {

    const { title, price, model, description } = req.body || {};
    const imagePath = req.file ? `/uploads/rewards/${req.file.filename}` : null;

    if (!title || !price || !model || !description) {
      return res.status(400).json({ 
        message: "Lütfen gerekli alanları doldurun.",
        received: { title, price, model, description }
      });
    }

    const result = await pool.query(
      'INSERT INTO rewards (title, price, model, description, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, price, model, description, imagePath]
    );

    res.status(201).json({
      message: "Ödül başarıyla oluşturuldu.",
      reward: result.rows[0]
    });
  } catch (err) {
    console.error("Ödül oluşturma hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

module.exports = { 
  getRewards, 
  createReward 
}; 