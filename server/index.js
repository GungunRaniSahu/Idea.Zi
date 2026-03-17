const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const ideaRoutes = require('./routes/ideaRoutes'); // 👈 Add this

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ideas', ideaRoutes); // 👈 Add this

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Dev Idea Generator API is running!' });
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