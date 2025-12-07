import express from "express";
import { supabase } from "../config/supabaseClient.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Reservations
 *   description: Reservation management
 */

/**
 * @openapi
 * /reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: Mendapatkan semua reservasi
 *     responses:
 *       200:
 *         description: Daftar reservasi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   schedule_id:
 *                     type: integer
 *                   passenger_name:
 *                     type: string
 *                   seat_number:
 *                     type: string
 *                   user_id:
 *                     type: integer
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("reservations").select("*");
  if (error) return res.status(500).json({ error });
  res.json(data);
});


/**
 * @openapi
 * /reservations:
 *   post:
 *     tags: [Reservations]
 *     summary: Membuat reservasi baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - schedule_id
 *               - passenger_name
 *               - seat_number
 *               - user_id
 *             properties:
 *               schedule_id:
 *                 type: integer
 *               passenger_name:
 *                 type: string
 *               seat_number:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reservasi berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     schedule_id:
 *                       type: integer
 *                     passenger_name:
 *                       type: string
 *                     seat_number:
 *                       type: string
 *                     user_id:
 *                       type: integer
 */
router.post("/", async (req, res) => {
  const { schedule_id, passenger_name, seat_number, user_id } = req.body;

  if (!schedule_id || !passenger_name || !seat_number || !user_id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        schedule_id,
        passenger_name,
        seat_number,
        user_id,
      },
    ])
    .select();

  if (error) return res.status(500).json({ error });

  res.json({ reservation: data[0] });
});

export default router;
