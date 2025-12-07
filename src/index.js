import 'dotenv/config';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import routes from './api/routes.js';
import schedules from './api/schedules.js';
import reservations from './api/reservations.js';

const app = express();
app.use(express.json());

// Swagger Docs Endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/routes', routes);
app.use('/schedules', schedules);
app.use('/reservations', reservations);

app.get('/', (req, res) => {
  res.send("Ticket Service Running");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});

export default app;
