// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const setupSwaggerDocs = require("./swagger");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // JSON body parse

setupSwaggerDocs(app);

// Route'ları dahil et
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔊 Sunucu ${PORT} portunda çalışıyor...`));
