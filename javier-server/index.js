require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const userRoutes    = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// ── Database ──────────────────────────────────────────────────────────────────
connectDB();

// ── CORS ──────────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ message: 'Javier API is running ✅' }));
app.use('/api/users',    userRoutes);
app.use('/api/articles', articleRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ── Listen only in local dev (Vercel uses the exported app) ──────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
