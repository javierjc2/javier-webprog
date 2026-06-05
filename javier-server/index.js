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
// Allow all origins in dev; in production Vercel injects the real frontend URL.
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN
        ? process.env.ALLOWED_ORIGIN.split(',')
        : '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

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

// ── Listen (skipped on Vercel – it uses the exported app) ────────────────────
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
