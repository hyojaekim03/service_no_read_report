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


// import express from "express";

// const app = express();
// const port = 5000;

// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello from the backend!");
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });