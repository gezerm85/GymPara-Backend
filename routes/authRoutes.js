const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: celo
 *               email:
 *                 type: string
 *                 example: celo@gmail.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Eksik alan veya email kayıtlı
 */
router.post("/register", register);




/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: celo@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       400:
 *         description: Bilgiler hatalı
 */
router.post("/login", login); // 🔥 login route tanımlandı

module.exports = router;
