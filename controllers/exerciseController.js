const pool = require("../db");

// GET /api/exercises/categories - Tüm kategorileri getir
const getCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM exercise_categories ORDER BY id");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Kategori getirme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// GET /api/exercises - Tüm egzersizleri getir
const getExercises = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, ec.name as category_name, ec.icon as category_icon 
      FROM exercises e 
      LEFT JOIN exercise_categories ec ON e.category_id = ec.id 
      ORDER BY e.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Egzersiz getirme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// POST /api/exercises/categories - Yeni kategori ekle
const createCategory = async (req, res) => {
  const { name, icon } = req.body;

  if (!name || !icon) {
    return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO exercise_categories (name, icon) VALUES ($1, $2) RETURNING *",
      [name, icon]
    );

    res.status(201).json({
      message: "Kategori başarıyla oluşturuldu.",
      category: result.rows[0]
    });
  } catch (err) {
    console.error("Kategori oluşturma hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// POST /api/exercises - Yeni egzersiz ekle
const createExercise = async (req, res) => {
  const { 
    name, 
    category_id, 
    duration, 
    calories, 
    difficulty, 
    image, 
    description 
  } = req.body;

  if (!name || !category_id || !duration || !calories || !difficulty) {
    return res.status(400).json({ message: "Lütfen gerekli alanları doldurun." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO exercises (name, category_id, duration, calories, difficulty, image, description) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, category_id, duration, calories, difficulty, image, description]
    );

    res.status(201).json({
      message: "Egzersiz başarıyla oluşturuldu.",
      exercise: result.rows[0]
    });
  } catch (err) {
    console.error("Egzersiz oluşturma hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

module.exports = { 
  getCategories, 
  getExercises, 
  createCategory, 
  createExercise 
}; 