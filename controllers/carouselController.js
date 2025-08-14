const pool = require("../db");

// GET /api/carousel - Tüm carousel verilerini getir
const getCarousel = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM carousel ORDER BY order_number");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Carousel getirme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// POST /api/carousel - Yeni carousel ekle
const createCarousel = async (req, res) => {
  try {
    const { order_number, link } = req.body;
    const imagePath = req.file ? `/uploads/carousel/${req.file.filename}` : null;

    if (!order_number || !req.file) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
    }

    const result = await pool.query(
      "INSERT INTO carousel (img_url, order_number, link) VALUES ($1, $2, $3) RETURNING *",
      [imagePath, order_number, link]
    );

    res.status(201).json({
      message: "Carousel başarıyla oluşturuldu.",
      carousel: result.rows[0]
    });
  } catch (err) {
    console.error("Carousel oluşturma hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// PUT /api/carousel/:id - Carousel güncelle
const updateCarousel = async (req, res) => {
  const { id } = req.params;
  const { img_url, order_number, link } = req.body;

  if (!img_url || !order_number) {
    return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
  }

  try {
    const result = await pool.query(
      "UPDATE carousel SET img_url = $1, order_number = $2, link = $3 WHERE id = $4 RETURNING *",
      [img_url, order_number, link, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Carousel bulunamadı." });
    }

    res.status(200).json({
      message: "Carousel güncellendi.",
      carousel: result.rows[0]
    });
  } catch (err) {
    console.error("Carousel güncelleme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// DELETE /api/carousel/:id - Carousel sil
const deleteCarousel = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM carousel WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Carousel bulunamadı." });
    }

    res.status(200).json({
      message: "Carousel başarıyla silindi.",
      carousel: result.rows[0]
    });
  } catch (err) {
    console.error("Carousel silme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

module.exports = { 
  getCarousel, 
  createCarousel, 
  updateCarousel, 
  deleteCarousel 
};
