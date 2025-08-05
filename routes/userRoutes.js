const express = require("express");
const router = express.Router();
const { getFullUserProfile, uploadProfileImage, updateUserPoint } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * /api/user/full:
 *   get:
 *     summary: Tüm kullanıcı bilgilerini (users + profile) getirir
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı profili bulundu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 point:
 *                   type: integer
 *                 welcome_completed:
 *                   type: boolean
 *                 profile_image_url:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 birth_year:
 *                   type: integer
 *                 activity_level:
 *                   type: string
 *                 motivation:
 *                   type: string
 *                 weight:
 *                   type: number
 *                 height:
 *                   type: number
 *                 workout_days:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Kullanıcı bulunamadı
 */

/**
 * @swagger
 * /api/user/upload:
 *   post:
 *     summary: Kullanıcının profil fotoğrafını yükler
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profil fotoğrafı (JPG, PNG, GIF)
 *                 example: "profile_photo.jpg"
 *     responses:
 *       200:
 *         description: Fotoğraf başarıyla yüklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil fotoğrafı başarıyla yüklendi."
 *                 url:
 *                   type: string
 *                   example: "/uploads/profile_images/user_1.png"
 *       400:
 *         description: Dosya seçilmedi
 *       401:
 *         description: Token bulunamadı
 *       500:
 *         description: Yükleme hatası
 */

// ✅ Kullanıcı puanını güncelle

/**
 * @swagger
 * /api/user/point:
 *   put:
 *     summary: Kullanıcının puanını günceller
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               point:
 *                 type: integer
 *                 example: 250
 *     responses:
 *       200:
 *         description: Puan güncellendi
 *       400:
 *         description: Hatalı istek
 *       404:
 *         description: Kullanıcı bulunamadı
 */


router.get("/full", verifyToken, getFullUserProfile);
router.post("/upload", verifyToken, uploadProfileImage);
router.put("/point", verifyToken, updateUserPoint);

module.exports = router;
