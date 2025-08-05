// workoutRoutes.js

const express = require("express");
const router = express.Router();
const { getWorkouts, logWorkout } = require("../controllers/workoutController");
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Kullanıcının spor kayıtlarını getirir
 *     tags:
 *       - Workout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Spor kayıtları başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   activity_id:
 *                     type: string
 *                     example: "4"
 *                   activity_title:
 *                     type: string
 *                     example: "Koşu"
 *                   duration:
 *                     type: number
 *                     example: 30
 *                   unit:
 *                     type: string
 *                     example: "dk"
 *                   rating:
 *                     type: integer
 *                     example: 4
 *                   note:
 *                     type: string
 *                     example: "Sabah koşusu yaptım, çok iyi hissettim"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00Z"
 *                   body_parts:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Bacak"]
 *                   supplements:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["creatine", "protein"]
 *             example:
 *               - id: 1
 *                 activity_id: "4"
 *                 activity_title: "Koşu"
 *                 duration: 30
 *                 unit: "dk"
 *                 rating: 4
 *                 note: "Sabah koşusu yaptım, çok iyi hissettim"
 *                 created_at: "2024-01-15T10:30:00Z"
 *                 body_parts: ["Bacak"]
 *                 supplements: ["creatine"]
 *               - id: 2
 *                 activity_id: "3"
 *                 activity_title: "Ağırlık Kaldırma"
 *                 duration: 60
 *                 unit: "dk"
 *                 rating: 5
 *                 note: "Bench press ve squat yaptım"
 *                 created_at: "2024-01-14T18:00:00Z"
 *                 body_parts: ["Göğüs", "Bacak"]
 *                 supplements: ["protein"]
 */

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Belirli bir kullanıcıya spor aktivitesi kaydı ekler
 *     tags:
 *       - Workout
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exercise_data:
 *                 type: object
 *                 required:
 *                   - activity_id
 *                   - activity_title
 *                   - duration
 *                   - unit
 *                 properties:
 *                   activity_id:
 *                     type: string
 *                     example: "4"
 *                   activity_title:
 *                     type: string
 *                     example: "Koşu"
 *                   duration:
 *                     type: number
 *                     example: 30
 *                   unit:
 *                     type: string
 *                     example: "dk"
 *                   rating:
 *                     type: integer
 *                     example: 4
 *                   note:
 *                     type: string
 *                     example: "Sabah koşusu yaptım, çok iyi hissettim"
 *                   body_parts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 7
 *                         name:
 *                           type: string
 *                           example: "Bacak"
 *                         icon:
 *                           type: string
 *                           example: "walking"
 *                         color:
 *                           type: string
 *                           example: "#98D8C8"
 *                   supplements:
 *                     type: object
 *                     properties:
 *                       creatine:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                             example: 5
 *                           unit:
 *                             type: string
 *                             example: "gram"
 *                       protein:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                             example: 2
 *                           unit:
 *                             type: string
 *                             example: "scoop"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00Z"
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Spor kaydı başarıyla eklendi."
 *       500:
 *         description: Sunucu hatası
 */


router.get("/", verifyToken, getWorkouts);
router.post("/", verifyToken, logWorkout);

module.exports = router;
