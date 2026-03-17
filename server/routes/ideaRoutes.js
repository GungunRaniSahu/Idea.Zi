const express = require('express');
const router = express.Router();
const { getIdeas, getRandomIdea } = require('../controllers/ideaController');

// GET /api/ideas         → fetch all ideas (with optional filters)
// GET /api/ideas?difficulty=Beginner&category=Web
router.get('/', getIdeas);

// GET /api/ideas/random  → fetch one random idea
router.get('/random', getRandomIdea);

module.exports = router;