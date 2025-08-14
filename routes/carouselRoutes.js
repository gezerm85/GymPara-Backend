const express = require("express");
const router = express.Router();
const { getCarousel, createCarousel, updateCarousel, deleteCarousel } = require("../controllers/carouselController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer konfigürasyonu - carousel görselleri için
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/carousel";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `carousel_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single("image");

/**
 * @swagger
 * /api/carousel:
 *   get:
 *     summary: Tüm carousel verilerini getirir
 *     tags:
 *       - Carousel
 *     responses:
 *       200:
 *         description: Carousel verileri başarıyla getirildi
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
 *                   img_url:
 *                     type: string
 *                     example: "https://example.com/image1.jpg"
 *                   link:
 *                     type: string
 *                     example: "https://example.com/page1"
 *                   order_number:
 *                     type: integer
 *                     example: 1
 *             example:
 *               - id: 1
 *                 img_url: "https://example.com/image1.jpg"
 *                 link: "https://example.com/page1"
 *                 order_number: 1
 *               - id: 2
 *                 img_url: "https://example.com/image2.jpg"
 *                 link: "https://example.com/page2"
 *                 order_number: 2
 *               - id: 3
 *                 img_url: "https://example.com/image3.jpg"
 *                 link: "https://example.com/page3"
 *                 order_number: 3
 */

/**
 * @swagger
 * /api/carousel:
 *   post:
 *     summary: Yeni carousel ekler
 *     tags:
 *       - Carousel
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - order_number
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Carousel görseli (JPG, PNG, GIF)
 *                 example: "carousel_image.jpg"
 *               order_number:
 *                 type: integer
 *                 example: 4
 *                 description: Görselin sıra numarası
 *               link:
 *                 type: string
 *                 example: "https://example.com/page"
 *                 description: Kullanıcı tıkladığında gideceği link (opsiyonel)
 *     responses:
 *       201:
 *         description: Carousel başarıyla oluşturuldu
 *       400:
 *         description: Eksik alan
 */

/**
 * @swagger
 * /api/carousel/{id}:
 *   put:
 *     summary: Carousel günceller
 *     tags:
 *       - Carousel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Carousel ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - img_url
 *               - order_number
 *             properties:
 *               img_url:
 *                 type: string
 *                 example: "https://example.com/updated-image.jpg"
 *               order_number:
 *                 type: integer
 *                 example: 2
 *               link:
 *                 type: string
 *                 example: "https://example.com/updated-page"
 *                 description: Kullanıcı tıkladığında gideceği link (opsiyonel)
 *     responses:
 *       200:
 *         description: Carousel güncellendi
 *       400:
 *         description: Eksik alan
 *       404:
 *         description: Carousel bulunamadı
 */

/**
 * @swagger
 * /api/carousel/{id}:
 *   delete:
 *     summary: Carousel siler
 *     tags:
 *       - Carousel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Carousel ID'si
 *     responses:
 *       200:
 *         description: Carousel başarıyla silindi
 *       404:
 *         description: Carousel bulunamadı
 */

// Route'lar
router.get("/", getCarousel);
router.post("/", upload, createCarousel);
router.put("/:id", updateCarousel);
router.delete("/:id", deleteCarousel);

module.exports = router;
