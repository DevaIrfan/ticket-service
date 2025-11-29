import express from 'express';
import { supabase } from '../utils/supabase.js';

const router = express.Router();

// GET schedules
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*, routes(origin, destination)');

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST new schedule
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
