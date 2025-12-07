import express from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Schedules
 *   description: Jadwal perjalanan tiket
 */

/**
 * @openapi
 * /schedules:
 *   get:
 *     tags: [Schedules]
 *     summary: Mendapatkan semua jadwal perjalanan
 *     responses:
 *       200:
 *         description: Daftar jadwal perjalanan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   route_id:
 *                     type: integer
 *                   departure_time:
 *                     type: string
 *                     format: date-time
 *                   price:
 *                     type: number
 *                   seats_total:
 *                     type: number
 *                   seats_available:
 *                     type: number
 *                   routes:
 *                     type: object
 *                     properties:
 *                       origin:
 *                         type: string
 *                       destination:
 *                         type: string
 */
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*, routes(origin, destination)');

  if (error) return res.status(500).json({ error });
  res.json(data);
});


/**
 * @openapi
 * /schedules:
 *   post:
 *     tags: [Schedules]
 *     summary: Menambahkan jadwal perjalanan baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - route_id
 *               - departure_time
 *               - price
 *               - seats_total
 *             properties:
 *               route_id:
 *                 type: integer
 *               departure_time:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *               seats_total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Jadwal berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 route_id:
 *                   type: integer
 *                 departure_time:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
 *                 seats_total:
 *                   type: number
 *                 seats_available:
 *                   type: number
 */
router.post('/', async (req, res) => {
  const { route_id, departure_time, price, seats_total } = req.body;

  const { data, error } = await supabase
    .from('schedules')
    .insert([
      { route_id, departure_time, price, seats_total, seats_available: seats_total }
    ])
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

export default router;
