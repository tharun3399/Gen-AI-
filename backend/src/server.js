import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware, errorHandler, notFound } from './middleware/index.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'AI Agent Solutions Platform API is running',
    health: '/health',
    api: '/api'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
