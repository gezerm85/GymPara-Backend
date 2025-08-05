// workoutController.js

const pool = require("../db");

// GET /api/workouts - Kullanıcının spor kayıtlarını getir
const getWorkouts = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT 
        wl.id,
        wl.activity_id,
        wl.activity_title,
        wl.duration,
        wl.unit,
        wl.rating,
        wl.note,
        wl.created_at,
        ARRAY_AGG(DISTINCT wbp.name) as body_parts,
        ARRAY_AGG(DISTINCT ws.type) FILTER (WHERE ws.type IS NOT NULL) as supplements
      FROM workout_logs wl
      LEFT JOIN workout_body_parts wbp ON wl.id = wbp.workout_log_id
      LEFT JOIN workout_supplements ws ON wl.id = ws.workout_log_id
      WHERE wl.user_id = $1
      GROUP BY wl.id, wl.activity_id, wl.activity_title, wl.duration, wl.unit, wl.rating, wl.note, wl.created_at
      ORDER BY wl.created_at DESC
    `, [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Spor kayıtları getirme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

const logWorkout = async (req, res) => {
  const {
    activity_id,
    activity_title,
    duration,
    unit,
    rating,
    note,
    body_parts,
    supplements,
    created_at
  } = req.body.exercise_data;
  
  const user_id = req.user.id;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Ana workout log kaydı
    const result = await client.query(
      `INSERT INTO workout_logs
       (user_id, activity_id, activity_title, duration, unit, rating, note, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [user_id, activity_id, activity_title, duration, unit, rating, note, created_at]
    );

    const workout_log_id = result.rows[0].id;

    // 2. Body parts
    for (const part of body_parts) {
      await client.query(
        `INSERT INTO workout_body_parts (workout_log_id, body_part_id, name, icon, color)
         VALUES ($1, $2, $3, $4, $5)`,
        [workout_log_id, part.id, part.name, part.icon, part.color]
      );
    }

    // 3. Supplements
    if (supplements?.creatine) {
      await client.query(
        `INSERT INTO workout_supplements (workout_log_id, type, amount, unit)
         VALUES ($1, 'creatine', $2, $3)`,
        [workout_log_id, supplements.creatine.amount, supplements.creatine.unit]
      );
    }
    if (supplements?.protein) {
      await client.query(
        `INSERT INTO workout_supplements (workout_log_id, type, amount, unit)
         VALUES ($1, 'protein', $2, $3)`,
        [workout_log_id, supplements.protein.amount, supplements.protein.unit]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Spor kaydı başarıyla eklendi." });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Workout kayıt hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  } finally {
    client.release();
  }
};

module.exports = { getWorkouts, logWorkout };
