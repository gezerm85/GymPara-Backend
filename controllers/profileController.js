const pool = require("../db");

// GET /api/profile
const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT 
         up.gender,
         up.birth_year,
         up.activity_level,
         up.motivation,
         up.weight,
         up.height,
         up.workout_days
       FROM user_profiles up
       WHERE up.user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profil bulunamadı." });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Profil çekme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// POST /api/profile
const createProfile = async (req, res) => {
  const {
    gender,
    birth_year,
    activity_level,
    motivation,
    weight,
    height,
    workout_days
  } = req.body;

  const user_id = req.user.id;

  try {
    await pool.query(
      `INSERT INTO user_profiles (
        user_id, gender, birth_year, activity_level,
        motivation, weight, height, workout_days
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [user_id, gender, birth_year, activity_level, motivation, weight, height, workout_days]
    );

    await pool.query(
      `UPDATE users SET welcome_completed = true WHERE id = $1`,
      [user_id]
    );

    res.status(201).json({ message: "Profil başarıyla oluşturuldu." });
  } catch (err) {
    console.error("Profil oluşturma hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};



// PUT /api/profile
const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    gender,
    birth_year,
    activity_level,
    motivation,
    weight,
    height,
    workout_days
  } = req.body;

  try {
    await pool.query(
      `UPDATE user_profiles
       SET gender = $1,
           birth_year = $2,
           activity_level = $3,
           motivation = $4,
           weight = $5,
           height = $6,
           workout_days = $7
       WHERE user_id = $8`,
      [gender, birth_year, activity_level, motivation, weight, height, workout_days, userId]
    );

    res.status(200).json({ message: "Profil güncellendi." });
  } catch (err) {
    console.error("Profil güncelleme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};


module.exports = { getProfile, createProfile, updateProfile };


