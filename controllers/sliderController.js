const pool = require("../db");

const getSliders = async (req, res) => {
  try {
    const result = await pool.query("SELECT image_url FROM sliders WHERE is_active = true ORDER BY id");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Slider çekme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = { getSliders };
