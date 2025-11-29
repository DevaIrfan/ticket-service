import express from 'express';
import { supabase } from '../utils/supabase.js';

const router = express.Router();

// GET all routes
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('routes').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST new route
router.post('/', async (req, res) => {
  const { origin, destination } = req.body;
  const { data, error } = await supabase
    .from('routes')
    .insert([{ origin, destination }])
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// PUT update route
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

// DELETE route
router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('routes').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error });
  res.json({ message: "Route deleted" });
});

export default router;
