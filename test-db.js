// test-db.js
const pool = require("./db/index");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Bağlantı hatası:", err.message);
  } else {
    console.log("✅ PostgreSQL bağlantısı başarılı:", res.rows);
  }
});
