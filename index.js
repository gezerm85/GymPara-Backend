// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const setupSwaggerDocs = require("./swagger");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const rewardRoutes = require("./routes/rewardRoutes");




dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8081', 'http://192.168.1.100:3000'],
  credentials: true
}));
app.use(express.json()); // JSON body parse

setupSwaggerDocs(app); 

// Route'ları dahil et
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/rewards", rewardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🔊 Sunucu ${PORT} portunda çalışıyor...`));
 