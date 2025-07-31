const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

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
 *                 example: Ali
 *               email:
 *                 type: string
 *                 example: ali@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Eksik alan veya email kayıtlı
 */
router.post("/register", register);

module.exports = router;
