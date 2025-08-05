const express = require("express");
const router = express.Router();
const { getRewards, createReward } = require("../controllers/rewardController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer konfigürasyonu - ödül görselleri için
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/rewards";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `reward_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single("image");

/**
 * @swagger
 * /api/rewards:
 *   get:
 *     summary: Tüm ödülleri getirir
 *     tags:
 *       - Rewards
 *     responses:
 *       200:
 *         description: Ödüller başarıyla getirildi
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
 *                   title:
 *                     type: string
 *                     example: "Hepsiburada Hediye çeki"
 *                   price:
 *                     type: integer
 *                     example: 200
 *                   model:
 *                     type: string
 *                     example: "Model: WH-1000XM4, Black"
 *                   description:
 *                     type: string
 *                     example: "The technology with two noise sensors and two microphones on each ear cup detects ambient noise and sends the data to the HD noise minimization processor QN1."
 *                   img:
 *                     type: string
 *                     example: "reward_image.png"
 *             example:
 *               - id: 1
 *                 title: "Hepsiburada Hediye çeki"
 *                 price: 200
 *                 model: "Model: WH-1000XM4, Black"
 *                 desc: "The technology with two noise sensors and two microphones on each ear cup detects ambient noise and sends the data to the HD noise minimization processor QN1. Using a new algorithm, the QN1 then processes and minimizes noise for different acoustic environments in real time. Together with a new Bluetooth Audio SoC"
 *                 img: "reward_image.png"
 *               - id: 2
 *                 title: "Amazon Hediye Kartı"
 *                 price: 150
 *                 model: "Model: Gift Card, Digital"
 *                 desc: "Amazon'da geçerli dijital hediye kartı. İstediğiniz ürünü seçebilirsiniz."
 *                 img: "amazon_card.png"
 *               - id: 3
 *                 title: "Nike Spor Ayakkabı"
 *                 price: 300
 *                 model: "Model: Air Max 270, White"
 *                 desc: "Rahat ve şık tasarım. Günlük kullanım için ideal spor ayakkabı."
 *                 img: "nike_shoe.png"
 */

/**
 * @swagger
 * /api/rewards:
 *   post:
 *     summary: Yeni ödül ekler
 *     tags:
 *       - Rewards
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - model
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Hepsiburada Hediye çeki"
 *               price:
 *                 type: integer
 *                 example: 200
 *               model:
 *                 type: string
 *                 example: "Model: WH-1000XM4, Black"
 *               description:
 *                 type: string
 *                 example: "The technology with two noise sensors and two microphones on each ear cup detects ambient noise and sends the data to the HD noise minimization processor QN1."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ödül görseli (JPG, PNG, GIF)
 *                 example: "reward_image.jpg"
 *     responses:
 *       201:
 *         description: Ödül başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ödül başarıyla oluşturuldu."
 *                 reward:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Hepsiburada Hediye çeki"
 *                     price:
 *                       type: integer
 *                       example: 200
 *                     model:
 *                       type: string
 *                       example: "Model: WH-1000XM4, Black"
 *                     description:
 *                       type: string
 *                       example: "The technology with two noise sensors..."
 *                     img:
 *                       type: string
 *                       example: "/uploads/rewards/reward_1.jpg"
 *       400:
 *         description: Eksik alan
 */

// Route'lar
router.get("/", getRewards);
router.post("/", upload, createReward);

module.exports = router; 