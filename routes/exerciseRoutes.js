const express = require("express");
const router = express.Router();
const { getCategories, getExercises, createCategory, createExercise } = require("../controllers/exerciseController");

/**
 * @swagger
 * /api/exercises/categories:
 *   get:
 *     summary: Tüm egzersiz kategorilerini getirir
 *     tags:
 *       - Exercises
 *     responses:
 *       200:
 *         description: Kategoriler başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "all"
 *                   name:
 *                     type: string
 *                     example: "Tümü"
 *                   icon:
 *                     type: string
 *                     example: "dumbbell"
 *             example:
 *               - id: "all"
 *                 name: "Tümü"
 *                 icon: "dumbbell"
 *               - id: "cardio"
 *                 name: "Kardiyo"
 *                 icon: "heart"
 *               - id: "strength"
 *                 name: "Güç"
 *                 icon: "weight-hanging"
 *               - id: "sports"
 *                 name: "Spor"
 *                 icon: "futbol"
 *               - id: "other"
 *                 name: "Diğer"
 *                 icon: "plus"
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Tüm egzersizleri getirir
 *     tags:
 *       - Exercises
 *     responses:
 *       200:
 *         description: Egzersizler başarıyla getirildi
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
 *                     example: "Futbol"
 *                   category_id:
 *                     type: string
 *                     example: "sports"
 *                   category_name:
 *                     type: string
 *                     example: "Spor"
 *                   category_icon:
 *                     type: string
 *                     example: "futbol"
 *                   duration:
 *                     type: string
 *                     example: "60-120 dk"
 *                   calories:
 *                     type: string
 *                     example: "400-800"
 *                   difficulty:
 *                     type: string
 *                     example: "Orta"
 *                   image:
 *                     type: string
 *                     example: "Running.png"
 *                   description:
 *                     type: string
 *                     example: "Takım sporu, kardiyovasküler sağlık için ideal"
 *             example:
 *               - id: 1
 *                 name: "Futbol"
 *                 category_id: "sports"
 *                 category_name: "Spor"
 *                 category_icon: "futbol"
 *                 duration: "60-120 dk"
 *                 calories: "400-800"
 *                 difficulty: "Orta"
 *                 image: "Running.png"
 *                 description: "Takım sporu, kardiyovasküler sağlık için ideal"
 *               - id: 2
 *                 name: "Koşu"
 *                 category_id: "cardio"
 *                 category_name: "Kardiyo"
 *                 category_icon: "heart"
 *                 duration: "30-60 dk"
 *                 calories: "300-600"
 *                 difficulty: "Orta"
 *                 image: "Running.png"
 *                 description: "Dayanıklılık ve kardiyovasküler sağlık için ideal"
 *               - id: 3
 *                 name: "Ağırlık Kaldırma"
 *                 category_id: "strength"
 *                 category_name: "Güç"
 *                 category_icon: "weight-hanging"
 *                 duration: "45-90 dk"
 *                 calories: "200-400"
 *                 difficulty: "İleri"
 *                 image: "Weights.png"
 *                 description: "Kas gücü ve kütlesi için temel egzersiz"
 *               - id: 4
 *                 name: "Basketbol"
 *                 category_id: "sports"
 *                 category_name: "Spor"
 *                 category_icon: "futbol"
 *                 duration: "60-90 dk"
 *                 calories: "500-800"
 *                 difficulty: "Orta"
 *                 image: "Running.png"
 *                 description: "Takım sporu, koordinasyon ve kardiyo"
 *               - id: 5
 *                 name: "Yoga"
 *                 category_id: "other"
 *                 category_name: "Diğer"
 *                 category_icon: "plus"
 *                 duration: "30-90 dk"
 *                 calories: "150-300"
 *                 difficulty: "Başlangıç"
 *                 image: "Advanced.png"
 *                 description: "Esneklik ve zihinsel sağlık için"
 *               - id: 6
 *                 name: "Bisiklet"
 *                 category_id: "cardio"
 *                 category_name: "Kardiyo"
 *                 category_icon: "heart"
 *                 duration: "30-60 dk"
 *                 calories: "250-500"
 *                 difficulty: "Orta"
 *                 image: "Running.png"
 *                 description: "Düşük etkili kardiyovasküler egzersiz"
 *               - id: 7
 *                 name: "Yüzme"
 *                 category_id: "cardio"
 *                 category_name: "Kardiyo"
 *                 category_icon: "heart"
 *                 duration: "30-60 dk"
 *                 calories: "400-700"
 *                 difficulty: "Orta"
 *                 image: "Running.png"
 *                 description: "Tam vücut egzersizi ve kardiyo"
 *               - id: 8
 *                 name: "Fitness"
 *                 category_id: "strength"
 *                 category_name: "Güç"
 *                 category_icon: "weight-hanging"
 *                 duration: "45-90 dk"
 *                 calories: "200-400"
 *                 difficulty: "Orta"
 *                 image: "Weights.png"
 *                 description: "Kas gücü ve kütlesi için fitness"
 */

/**
 * @swagger
 * /api/exercises/categories:
 *   post:
 *     summary: Yeni egzersiz kategorisi ekler
 *     tags:
 *       - Exercises
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - icon
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yeni Kategori"
 *               icon:
 *                 type: string
 *                 example: "star"
 *     responses:
 *       201:
 *         description: Kategori başarıyla oluşturuldu
 *       400:
 *         description: Eksik alan
 */

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Yeni egzersiz ekler
 *     tags:
 *       - Exercises
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category_id
 *               - duration
 *               - calories
 *               - difficulty
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yeni Egzersiz"
 *               category_id:
 *                 type: string
 *                 example: "cardio"
 *               duration:
 *                 type: string
 *                 example: "30-60 dk"
 *               calories:
 *                 type: string
 *                 example: "300-500"
 *               difficulty:
 *                 type: string
 *                 example: "Orta"
 *               image:
 *                 type: string
 *                 example: "exercise.png"
 *               description:
 *                 type: string
 *                 example: "Egzersiz açıklaması"
 *     responses:
 *       201:
 *         description: Egzersiz başarıyla oluşturuldu
 *       400:
 *         description: Eksik alan
 */

// Route'lar
router.get("/categories", getCategories);
router.get("/", getExercises);
router.post("/categories", createCategory);
router.post("/", createExercise);

module.exports = router; 