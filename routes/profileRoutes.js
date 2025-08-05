const express = require("express");
const router = express.Router();
const { getProfile, createProfile, updateProfile } = require("../controllers/profileController");
const verifyToken = require("../middlewares/verifyToken");


// profile verilerini çek
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Kullanıcının profil bilgilerini getirir
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil bulundu
 *       404:
 *         description: Profil bulunamadı
 */



// oluşturma işlemi
/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Yeni kullanıcı profilini oluşturur
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gender
 *               - birth_year
 *               - activity_level
 *               - motivation
 *               - weight
 *               - height
 *               - workout_days
 *             properties:
 *               gender:
 *                 type: string
 *                 example: Kadın
 *               birth_year:
 *                 type: integer
 *                 example: 1999
 *               activity_level:
 *                 type: string
 *                 example: Kısmen aktif
 *               motivation:
 *                 type: string
 *                 example: Sağlık ve zindelik
 *               weight:
 *                 type: number
 *                 example: 65.5
 *               height:
 *                 type: number
 *                 example: 168
 *               workout_days:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Pazartesi", "Çarşamba"]
 *     responses:
 *       201:
 *         description: Profil başarıyla oluşturuldu
 */

//güncelleme işlemi

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Kullanıcı profilini günceller
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: string
 *               birth_year:
 *                 type: integer
 *               activity_level:
 *                 type: string
 *               motivation:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               workout_days:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profil güncellendi
 */




router.get("/", verifyToken, getProfile);
router.post("/", verifyToken, createProfile);
router.put("/", verifyToken, updateProfile);


module.exports = router;

