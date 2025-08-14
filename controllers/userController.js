const pool = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Kullanıcının tam profilini getir
const getFullUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT 
         u.id AS user_id,
         u.name,
         u.email,
         u.point,
         u.welcome_completed,
         u.profile_image_url,   
         up.gender,
         up.birth_year,
         up.activity_level,
         up.motivation,
         up.weight,
         up.height,
         up.workout_days
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Profil çekme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// ✅ multer konfigürasyonu – yükleme klasörü ve dosya adı
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/profile_images";
    fs.mkdirSync(uploadDir, { recursive: true }); // klasör yoksa oluştur
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `user_${req.user.id}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single("image");

// ✅ Profil fotoğrafı yükle ve profile_image_url güncelle
const uploadProfileImage = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error("Yükleme hatası:", err);
      return res.status(500).json({ message: "Dosya yüklenemedi." });
    }

    const userId = req.user.id;
    const imagePath = `/uploads/profile_images/${req.file.filename}`;

    try {
      await pool.query(
        "UPDATE users SET profile_image_url = $1 WHERE id = $2",
        [imagePath, userId]
      );

      res.status(200).json({
        message: "Profil fotoğrafı başarıyla yüklendi.",
        url: imagePath,
      });
    } catch (dbErr) {
      console.error("DB güncelleme hatası:", dbErr);
      res.status(500).json({ message: "Veritabanına yazılamadı." });
    }
  });
};


const updateUserPoint = async (req, res) => {
  const userId = req.user.id;
  const { point } = req.body;

  if (typeof point !== "number") {
    return res.status(400).json({ message: "Geçerli bir sayı girin (point)." });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET point = $1 WHERE id = $2 RETURNING id, point",
      [point, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json({
      message: "Puan güncellendi.",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Puan güncelleme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};


// GET /api/users/leaderboard - Tüm kullanıcıların puan sıralaması
const getLeaderboard = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id,
        u.name,
        u.point,
        u.profile_image_url,
        up.gender,
        up.birth_year,
        up.activity_level,
        up.motivation,
        up.weight,
        up.height,
        up.workout_days
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.welcome_completed = true
      ORDER BY u.point DESC, u.name ASC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Leaderboard getirme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

module.exports = {
  getFullUserProfile,
  uploadProfileImage,
  updateUserPoint,
  getLeaderboard
};
