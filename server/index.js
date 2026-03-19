const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const ideaRoutes = require('./routes/ideaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS — allow local dev + Vercel production ──
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://idea-zi.vercel.app'    // 👈 replace with YOUR vercel URL
  ]
}));

app.use(express.json());

// Routes
app.use('/api/ideas', ideaRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Idea.Zi API is running!' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('❌ MongoDB error:', err));