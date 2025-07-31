const bcrypt = require("bcryptjs");
const pool = require("../db");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Gerekli alanlar var mı kontrol et
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
  }

  try {
    // 2. Email daha önce kayıtlı mı?
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı." });
    }

    // 3. Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Kullanıcıyı veritabanına kaydet
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, hashedPassword]
    );

    // 5. Kayıt başarılı yanıtı dön
    res.status(201).json({
      message: "Kayıt başarılı.",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error("Kayıt hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

module.exports = { register };
