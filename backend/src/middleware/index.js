import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

export const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found' });
};
