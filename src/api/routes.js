import express from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Routes
 *   description: Ticket route management
 */

/**
 * @openapi
 * /routes:
 *   get:
 *     tags: [Routes]
 *     summary: Mendapatkan semua rute tiket
 *     responses:
 *       200:
 *         description: Daftar semua rute berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   origin:
 *                     type: string
 *                   destination:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('routes').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});


/**
 * @openapi
 * /routes:
 *   post:
 *     tags: [Routes]
 *     summary: Menambahkan rute baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origin
 *               - destination
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rute berhasil ditambahkan
 */
router.post('/', async (req, res) => {
  const { origin, destination } = req.body;
  const { data, error } = await supabase
    .from('routes')
    .insert([{ origin, destination }])
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});


/**
 * @openapi
 * /routes/{id}:
 *   put:
 *     tags: [Routes]
 *     summary: Update data rute berdasarkan ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID rute
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rute berhasil diperbarui
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { origin, destination } = req.body;
  const { data, error } = await supabase
    .from('routes')
    .update({ origin, destination })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});


/**
 * @openapi
 * /routes/{id}:
 *   delete:
 *     tags: [Routes]
 *     summary: Menghapus rute berdasarkan ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID rute
 *     responses:
 *       200:
 *         description: Rute berhasil dihapus
 */
router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('routes').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error });
  res.json({ message: "Route deleted" });
});

export default router;
