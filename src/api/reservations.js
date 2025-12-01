import express from "express";
import { supabase } from "../config/supabaseClient.js";

const router = express.Router();

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
        user_id
      },
    ])
    .select();

  if (error) return res.status(500).json({ error });

  res.json({ reservation: data[0] });
});

export default router;
