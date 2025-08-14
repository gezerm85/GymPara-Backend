const express = require("express");
const router = express.Router();
const { getFullUserProfile, uploadProfileImage, updateUserPoint, getLeaderboard } = require("../controllers/userController");
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
 * /api/user/leaderboard:
 *   get:
 *     summary: Tüm kullanıcıların puan sıralamasını getirir
 *     tags:
 *       - User
 *     description: Ana sayfa için puan sıralaması. Token gerekmez.
 *     responses:
 *       200:
 *         description: Leaderboard başarıyla getirildi
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
 *                   name:
 *                     type: string
 *                     example: "Ahmet"
 *                   point:
 *                     type: integer
 *                     example: 850
 *                   profile_image_url:
 *                     type: string
 *                     example: "/uploads/profile_images/user_1.png"
 *                   gender:
 *                     type: string
 *                     example: "Erkek"
 *                   birth_year:
 *                     type: integer
 *                     example: 1995
 *                   activity_level:
 *                     type: string
 *                     example: "Aktif"
 *                   motivation:
 *                     type: string
 *                     example: "Sağlık ve zindelik"
 *                   weight:
 *                     type: number
 *                     example: 75.5
 *                   height:
 *                     type: number
 *                     example: 180
 *                   workout_days:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Pazartesi", "Çarşamba", "Cuma"]
 *             example:
 *               - id: 1
 *                 name: "Ahmet"
 *                 point: 850
 *                 profile_image_url: "/uploads/profile_images/user_1.png"
 *                 gender: "Erkek"
 *                 birth_year: 1995
 *                 activity_level: "Aktif"
 *                 motivation: "Sağlık ve zindelik"
 *                 weight: 75.5
 *                 height: 180
 *                 workout_days: ["Pazartesi", "Çarşamba", "Cuma"]
 *               - id: 2
 *                 name: "Ayşe"
 *                 point: 720
 *                 profile_image_url: "/uploads/profile_images/user_2.png"
 *                 gender: "Kadın"
 *                 birth_year: 1998
 *                 activity_level: "Kısmen aktif"
 *                 motivation: "Kilo vermek"
 *                 weight: 65.0
 *                 height: 165
 *                 workout_days: ["Salı", "Perşembe"]
 *               - id: 3
 *                 name: "Mehmet"
 *                 point: 650
 *                 profile_image_url: "/uploads/profile_images/user_3.png"
 *                 gender: "Erkek"
 *                 birth_year: 1992
 *                 activity_level: "Başlangıç"
 *                 motivation: "Kas yapmak"
 *                 weight: 80.0
 *                 height: 175
 *                 workout_days: ["Pazartesi", "Salı", "Çarşamba"]
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
router.get("/leaderboard", getLeaderboard); // Token gerekmiyor

module.exports = router;
