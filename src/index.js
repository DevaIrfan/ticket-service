import 'dotenv/config';
import express from 'express';

import routes from './api/routes.js';
import schedules from './api/schedules.js';
import reservations from './api/reservations.js';

const app = express();
app.use(express.json());

app.use('/routes', routes);
app.use('/schedules', schedules);
app.use('/reservations', reservations);

app.get('/', (req, res) => {
  res.send("Ticket Service Running");
});

export default app;
