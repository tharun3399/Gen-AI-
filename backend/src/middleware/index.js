import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const defaultOrigins = ['http://localhost:5173', 'http://localhost:3000'];
const configuredOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultOrigins;

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (configuredOrigins.includes(origin)) return true;

  return /^https:\/\/.*\.vercel\.app$/.test(origin);
};

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
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
