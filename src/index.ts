import express from 'express';
import userRoutes from './routes/table.routes';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});